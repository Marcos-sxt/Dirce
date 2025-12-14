import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from '../prisma/prisma.service';
import { StellarModule } from '../stellar/stellar.module';

@Module({
  imports: [StellarModule],
  providers: [TransactionsService, PrismaService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
