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

@Injectable()
export class StellarService {
  private readonly server: Horizon.Server;
  private readonly network: string;
  private readonly issuerSecret: string;
  private readonly refeicaoAsset: Asset;

  constructor(private configService: ConfigService) {
    this.network =
      this.configService.get<string>('STELLAR_NETWORK') || 'testnet';
    this.issuerSecret =
      this.configService.get<string>('STELLAR_SECRET_KEY') || '';

    // Configurar servidor Stellar (testnet ou mainnet)
    this.server = new Horizon.Server(
      this.network === 'testnet'
        ? 'https://horizon-testnet.stellar.org'
        : 'https://horizon.stellar.org',
    );

    // Criar asset REFEICAO
    // Para MVP, usar XLM nativo se não houver issuer configurado
    let issuerPublicKey = '';
    if (this.issuerSecret && this.issuerSecret !== 'your_stellar_secret_key_here') {
      try {
        const keypair = Keypair.fromSecret(this.issuerSecret);
        issuerPublicKey = keypair.publicKey();
      } catch (error) {
        console.warn('Stellar secret key inválida, usando XLM nativo:', error.message);
      }
    }

    this.refeicaoAsset =
      issuerPublicKey && this.network === 'testnet'
        ? new Asset('REFEICAO', issuerPublicKey)
        : Asset.native();
  }

  /**
   * Consulta saldo de uma wallet
   */
  async getBalance(walletAddress: string): Promise<number> {
    try {
      const account = await this.server.loadAccount(walletAddress);
      
      // Buscar saldo do asset REFEICAO
      const balance = account.balances.find((b) => {
        if (b.asset_type === 'native') {
          // Se não houver issuer configurado, retornar XLM (para fallback)
          return this.refeicaoAsset.isNative();
        }
        if (b.asset_type === 'credit_alphanum4' || b.asset_type === 'credit_alphanum12') {
          return 'asset_code' in b && b.asset_code === 'REFEICAO';
        }
        return false;
      });

      if (!balance) return 0;

      return parseFloat(balance.balance);
    } catch (error: any) {
      // Se conta não existe, retornar 0
      if (error.response?.status === 404 || error.message?.includes('not found')) {
        return 0;
      }
      console.error('Erro ao consultar saldo Stellar:', error.message);
      return 0;
    }
  }

  /**
   * Cria e envia transação para transferir tokens REFEICAO
   */
  async transferTokens(
    fromSecret: string,
    toAddress: string,
    amount: number,
  ): Promise<string> {
    try {
      const sourceKeypair = Keypair.fromSecret(fromSecret);
      const sourceAccount = await this.server.loadAccount(
        sourceKeypair.publicKey(),
      );

      const transaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase:
          this.network === 'testnet'
            ? Networks.TESTNET
            : Networks.PUBLIC,
      })
        .addOperation(
          Operation.payment({
            destination: toAddress,
            asset: this.refeicaoAsset,
            amount: amount.toFixed(7), // Stellar usa 7 casas decimais
          }),
        )
        .setTimeout(30)
        .build();

      transaction.sign(sourceKeypair);

      const result = await this.server.submitTransaction(transaction);
      return result.hash;
    } catch (error) {
      console.error('Erro ao transferir tokens Stellar:', error);
      throw new Error(`Falha na transação: ${error.message}`);
    }
  }

  /**
   * Cria uma nova wallet
   */
  async createWallet(): Promise<{ publicKey: string; secretKey: string }> {
    const keypair = Keypair.random();
    return {
      publicKey: keypair.publicKey(),
      secretKey: keypair.secret(),
    };
  }
}
