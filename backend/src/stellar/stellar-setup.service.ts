import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Keypair,
  Asset,
  TransactionBuilder,
  Networks,
  Operation,
  BASE_FEE,
  Horizon,
} from '@stellar/stellar-sdk';
import axios from 'axios';

@Injectable()
export class StellarSetupService {
  private readonly server: Horizon.Server;
  private readonly network: string;
  private readonly friendbotUrl = 'https://friendbot.stellar.org';

  constructor(private configService: ConfigService) {
    this.network =
      this.configService.get<string>('STELLAR_NETWORK') || 'testnet';
    this.server = new Horizon.Server(
      this.network === 'testnet'
        ? 'https://horizon-testnet.stellar.org'
        : 'https://horizon.stellar.org',
    );
  }

  /**
   * Funda uma wallet com XLM de teste via Friendbot
   */
  async fundWalletWithTestXLM(publicKey: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${this.friendbotUrl}/?addr=${publicKey}`,
      );
      return response.status === 200;
    } catch (error) {
      console.error(`Erro ao fundar wallet ${publicKey}:`, error.message);
      return false;
    }
  }

  /**
   * Cria trustline para receber asset REFEICAO
   */
  async createTrustline(
    walletSecret: string,
    assetCode: string,
    issuerPublicKey: string,
  ): Promise<string> {
    try {
      const keypair = Keypair.fromSecret(walletSecret);
      const account = await this.server.loadAccount(keypair.publicKey());

      const asset = new Asset(assetCode, issuerPublicKey);

      const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase:
          this.network === 'testnet' ? Networks.TESTNET : Networks.PUBLIC,
      })
        .addOperation(
          Operation.changeTrust({
            asset: asset,
          }),
        )
        .setTimeout(30)
        .build();

      transaction.sign(keypair);
      const result = await this.server.submitTransaction(transaction);
      return result.hash;
    } catch (error: any) {
      // Trustline já existe é OK
      if (
        error.message?.includes('already exists') ||
        error.message?.includes('TRUST_LINE_ALREADY_EXISTS')
      ) {
        return 'trustline_exists';
      }
      throw error;
    }
  }

  /**
   * Emite tokens REFEICAO para uma wallet
   */
  async issueTokens(
    issuerSecret: string,
    destinationPublicKey: string,
    amount: number,
  ): Promise<string> {
    try {
      const issuerKeypair = Keypair.fromSecret(issuerSecret);
      const issuerAccount = await this.server.loadAccount(
        issuerKeypair.publicKey(),
      );

      const asset = new Asset('REFEICAO', issuerKeypair.publicKey());

      const transaction = new TransactionBuilder(issuerAccount, {
        fee: BASE_FEE,
        networkPassphrase:
          this.network === 'testnet' ? Networks.TESTNET : Networks.PUBLIC,
      })
        .addOperation(
          Operation.payment({
            destination: destinationPublicKey,
            asset: asset,
            amount: amount.toFixed(7),
          }),
        )
        .setTimeout(30)
        .build();

      transaction.sign(issuerKeypair);
      const result = await this.server.submitTransaction(transaction);
      return result.hash;
    } catch (error) {
      console.error('Erro ao emitir tokens:', error);
      throw error;
    }
  }

  /**
   * Verifica se wallet existe e tem fundos
   */
  async checkWallet(publicKey: string): Promise<{
    exists: boolean;
    hasFunds: boolean;
    balance: number;
  }> {
    try {
      const account = await this.server.loadAccount(publicKey);
      const xlmBalance = account.balances.find((b) => b.asset_type === 'native');
      return {
        exists: true,
        hasFunds: parseFloat(xlmBalance?.balance || '0') > 0,
        balance: parseFloat(xlmBalance?.balance || '0'),
      };
    } catch (error) {
      return {
        exists: false,
        hasFunds: false,
        balance: 0,
      };
    }
  }
}
