import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('process')
  async processPayment(
    @Body('userWallet') userWallet: string,
    @Body('stationId') stationId: string,
    @Body('amount') amount: number,
  ) {
    if (!userWallet || !stationId) {
      throw new BadRequestException(
        'userWallet e stationId são obrigatórios',
      );
    }

    return this.transactionsService.processPayment(
      userWallet,
      stationId,
      amount || 1.0,
    );
  }

  @Post('nfc-simulate')
  async simulateNFCPayment(
    @Body('walletAddress') walletAddress: string,
    @Body('stationId') stationId: string,
    @Body('amount') amount?: number,
  ) {
    if (!walletAddress || !stationId) {
      throw new BadRequestException(
        'walletAddress e stationId são obrigatórios',
      );
    }

    return this.transactionsService.simulateNFCPayment(
      walletAddress,
      stationId,
      amount,
    );
  }

  @Get('user/:wallet')
  async getUserTransactions(@Param('wallet') wallet: string) {
    return this.transactionsService.getUserTransactions(wallet);
  }

  @Get('station/:stationId')
  async getStationTransactions(@Param('stationId') stationId: string) {
    return this.transactionsService.getStationTransactions(stationId);
  }

  @Get('balance/:wallet')
  async getBalance(@Param('wallet') wallet: string) {
    const balance = await this.transactionsService.getUserBalance(wallet);
    return { wallet, balance, asset: 'REFEICAO' };
  }

  @Post('register-demo-user')
  async registerDemoUser(
    @Body('publicKey') publicKey: string,
    @Body('secretKey') secretKey: string,
  ) {
    // Para demo: registrar secret key temporariamente
    // ⚠️ NÃO usar em produção!
    this.transactionsService.registerDemoUserSecret(publicKey, secretKey);
    return {
      message: 'Usuário demo registrado (apenas para desenvolvimento)',
      publicKey,
    };
  }
}
