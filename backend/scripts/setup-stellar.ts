/**
 * Script de Setup Stellar - Cria wallets, asset e configura tudo
 * 
 * Uso: npx ts-node scripts/setup-stellar.ts
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { StellarService } from '../src/stellar/stellar.service';
import { StellarSetupService } from '../src/stellar/stellar-setup.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const stellarService = app.get(StellarService);
  const setupService = app.get(StellarSetupService);
  const prisma = app.get(PrismaService);
  const config = app.get(ConfigService);

  const issuerSecret = config.get<string>('STELLAR_SECRET_KEY');
  if (!issuerSecret || issuerSecret === 'your_stellar_secret_key_here') {
    console.error('❌ STELLAR_SECRET_KEY não configurada no .env');
    console.log('💡 Crie uma wallet issuer primeiro:');
    console.log('   const keypair = Keypair.random();');
    console.log('   console.log("Public:", keypair.publicKey());');
    console.log('   console.log("Secret:", keypair.secret());');
    process.exit(1);
  }

  console.log('🚀 Iniciando setup Stellar...\n');

  try {
    // 1. Verificar/Criar wallet issuer
    const issuerKeypair = require('@stellar/stellar-sdk').Keypair.fromSecret(issuerSecret);
    const issuerPublicKey = issuerKeypair.publicKey();
    console.log(`📝 Issuer Wallet: ${issuerPublicKey}`);

    // Verificar se wallet existe e tem fundos
    const issuerCheck = await setupService.checkWallet(issuerPublicKey);
    if (!issuerCheck.exists) {
      console.log('💰 Fundando wallet issuer com XLM de teste...');
      await setupService.fundWalletWithTestXLM(issuerPublicKey);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Aguardar confirmação
    }
    console.log(`✅ Issuer wallet OK (XLM: ${issuerCheck.balance})\n`);

    // 2. Criar wallets para estações
    console.log('🏪 Criando wallets para estações...');
    const stations = await prisma.station.findMany();
    
    for (const station of stations) {
      if (station.stellarWallet) {
        console.log(`   ⏭️  Estação ${station.name} já tem wallet: ${station.stellarWallet}`);
        continue;
      }

      // Criar nova wallet
      const wallet = await stellarService.createWallet();
      console.log(`   ✅ Criada wallet para ${station.name}: ${wallet.publicKey}`);

      // Fundar com XLM
      await setupService.fundWalletWithTestXLM(wallet.publicKey);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Criar trustline
      await setupService.createTrustline(wallet.secretKey, 'REFEICAO', issuerPublicKey);
      console.log(`   ✅ Trustline criada para ${station.name}`);

      // Atualizar no banco
      await prisma.station.update({
        where: { id: station.id },
        data: { stellarWallet: wallet.publicKey },
      });
    }

    console.log(`\n✅ ${stations.length} estações configuradas\n`);

    // 3. Criar wallets demo para usuários
    console.log('👥 Criando wallets demo para usuários...');
    const demoUsers = [
      { name: 'Usuário Demo 1', tokens: 100 },
      { name: 'Usuário Demo 2', tokens: 100 },
      { name: 'Usuário Demo 3', tokens: 100 },
    ];

    const userWallets: Array<{ name: string; publicKey: string; secretKey: string }> = [];

    for (const user of demoUsers) {
      const wallet = await stellarService.createWallet();
      console.log(`   ✅ Criada wallet para ${user.name}: ${wallet.publicKey}`);

      // Fundar com XLM
      await setupService.fundWalletWithTestXLM(wallet.publicKey);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Criar trustline
      await setupService.createTrustline(wallet.secretKey, 'REFEICAO', issuerPublicKey);
      console.log(`   ✅ Trustline criada para ${user.name}`);

      // Emitir tokens
      const txHash = await setupService.issueTokens(
        issuerSecret,
        wallet.publicKey,
        user.tokens,
      );
      console.log(`   ✅ Emitidos ${user.tokens} REFEICAO (Tx: ${txHash})`);

      userWallets.push({
        name: user.name,
        publicKey: wallet.publicKey,
        secretKey: wallet.secretKey,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    console.log('\n✅ Wallets de usuários criadas\n');

    // 4. Salvar secret keys (temporariamente, para demo)
    console.log('\n💾 Secret keys dos usuários demo:');
    console.log('   (Adicione essas keys no .env)\n');
    console.log('   # Adicione essas linhas no seu .env:\n');
    userWallets.forEach((user, index) => {
      const envVar = `DEMO_USER_${index + 1}_SECRET`;
      console.log(`   ${envVar}=${user.secretKey}`);
      console.log(`   # ${user.name}: ${user.publicKey}\n`);
    });

    console.log('🎉 Setup Stellar concluído!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. Adicione as secret keys acima no seu .env');
    console.log('   2. Reinicie o backend para carregar as keys');
    console.log('   3. Teste uma transação:');
    console.log(`      curl -X POST http://localhost:3001/transactions/process \\`);
    console.log(`        -H "Content-Type: application/json" \\`);
    console.log(`        -d '{"userWallet":"${userWallets[0].publicKey}","stationId":"<ID_ESTACAO>","amount":1.0}'`);
    console.log('   4. Verifique na blockchain:');
    console.log('      https://stellar.expert/explorer/testnet');

  } catch (error) {
    console.error('❌ Erro no setup:', error);
    throw error;
  } finally {
    await app.close();
  }
}

bootstrap();

