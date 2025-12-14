import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { StellarModule } from '../stellar/stellar.module';
import { StationsModule } from '../stations/stations.module';

@Module({
  imports: [StellarModule, StationsModule],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
