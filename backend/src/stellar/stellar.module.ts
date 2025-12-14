import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StellarService } from './stellar.service';
import { StellarSetupService } from './stellar-setup.service';

@Module({
  imports: [ConfigModule],
  providers: [StellarService, StellarSetupService],
  exports: [StellarService, StellarSetupService],
})
export class StellarModule {}
