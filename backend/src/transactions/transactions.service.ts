import { Injectable, BadRequestException } from '@nestjs/common';
import { StellarService } from '../stellar/stellar.service';
import { StationsService } from '../stations/stations.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionsService {
  // Para demo: armazenar secret keys em memória (NÃO usar em produção!)
  // Em produção, usar custódia externa ou hardware wallet
  private readonly demoUserSecrets: Map<string, string> = new Map();
  // Mock: armazenar transações em memória
  private readonly transactions: any[] = [];

  constructor(
    private stationsService: StationsService,
    private stellarService: StellarService,
    private configService: ConfigService,
  ) {
    // Carregar secret keys de usuários demo do .env ou variáveis de ambiente
    // Formato: DEMO_USER_1_SECRET=..., DEMO_USER_2_SECRET=...
    this.loadDemoUserSecrets();
  }

  private loadDemoUserSecrets() {
    // Carregar até 10 usuários demo
    for (let i = 1; i <= 10; i++) {
      const secret = this.configService.get<string>(`DEMO_USER_${i}_SECRET`);
      if (secret && secret !== '') {
        // Extrair public key da secret key para usar como chave do Map
        const { Keypair } = require('@stellar/stellar-sdk');
        try {
          const keypair = Keypair.fromSecret(secret);
          this.demoUserSecrets.set(keypair.publicKey(), secret);
          console.log(`✅ Usuário demo ${i} carregado: ${keypair.publicKey()}`);
        } catch (error: any) {
          console.warn(`⚠️  Secret key inválida para DEMO_USER_${i}: ${error.message}`);
        }
      }
    }
    console.log(`📝 ${this.demoUserSecrets.size} usuários demo carregados`);
  }

  /**
   * Registra secret key de um usuário demo (para uso temporário)
   */
  registerDemoUserSecret(publicKey: string, secretKey: string) {
    this.demoUserSecrets.set(publicKey, secretKey);
  }

  /**
   * Processa pagamento de uma refeição (ONCHAIN REAL)
   * @param userWallet Wallet do usuário
   * @param stationId ID da estação
   * @param amount Quantidade de tokens REFEICAO
   */
  async processPayment(
    userWallet: string,
    stationId: string,
    amount: number,
  ) {
    // Buscar estação (mock - usando StationsService)
    const station = await this.stationsService.findById(stationId);

    if (!station) {
      throw new BadRequestException('Estação não encontrada');
    }

    if (!station.stellarWallet) {
      throw new BadRequestException('Estação não tem wallet Stellar configurada');
    }

    // Verificar saldo do usuário (ONCHAIN REAL)
    const balance = await this.stellarService.getBalance(userWallet);
    if (balance < amount) {
      throw new BadRequestException(
        `Saldo insuficiente. Saldo atual: ${balance} REFEICAO`,
      );
    }

    // Obter secret key do usuário (para demo)
    const userSecret = this.demoUserSecrets.get(userWallet);
    if (!userSecret) {
      throw new BadRequestException(
        'Secret key do usuário não encontrada. Para demo, registre a secret key primeiro.',
      );
    }

    try {
      // Executar transação REAL na blockchain Stellar
      const txHash = await this.stellarService.transferTokens(
        userSecret,
        station.stellarWallet,
        amount,
      );

      // Salvar transação (mock - em memória)
      const transaction = {
        id: `tx_${Date.now()}`,
        stellarTxHash: txHash,
        userWallet,
        stationId,
        amount,
        status: 'confirmed', // Stellar confirma em ~5 segundos
        createdAt: new Date(),
      };
      
      this.transactions.push(transaction);

      return {
        ...transaction,
        message: 'Pagamento processado com sucesso na blockchain',
        explorerUrl: `https://stellar.expert/explorer/testnet/tx/${txHash}`,
      };
    } catch (error: any) {
      console.error('Erro ao processar pagamento onchain:', error);
      throw new BadRequestException(
        `Falha ao processar pagamento: ${error.message}`,
      );
    }
  }

  /**
   * Simula pagamento via NFC (usa processPayment real)
   */
  async simulateNFCPayment(
    walletAddress: string,
    stationId: string,
    amount: number = 1.0,
  ) {
    return this.processPayment(walletAddress, stationId, amount);
  }

  /**
   * Lista transações de um usuário (mock - em memória)
   */
  async getUserTransactions(userWallet: string) {
    const filtered = this.transactions
      .filter(tx => tx.userWallet === userWallet)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    // Buscar estações para cada transação
    const transactionsWithStations = await Promise.all(
      filtered.map(async (tx) => ({
        ...tx,
        station: await this.stationsService.findById(tx.stationId),
      }))
    );
    
    return transactionsWithStations;
  }

  /**
   * Lista transações de uma estação (mock - em memória)
   */
  async getStationTransactions(stationId: string) {
    return this.transactions
      .filter(tx => tx.stationId === stationId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Consulta saldo de um usuário (ONCHAIN REAL)
   */
  async getUserBalance(userWallet: string): Promise<number> {
    return this.stellarService.getBalance(userWallet);
  }
}
