/**
 * Script para mostrar informações do Stellar (issuer, asset, etc.)
 * 
 * Uso: npx ts-node scripts/show-stellar-info.ts
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';
import { StellarService } from '../src/stellar/stellar.service';
import { PrismaService } from '../src/prisma/prisma.service';
import * as dotenv from 'dotenv';
import { Keypair } from '@stellar/stellar-sdk';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(ConfigService);
  const stellarService = app.get(StellarService);
  const prisma = app.get(PrismaService);

  console.log('🔍 Informações do Stellar - Dirce\n');
  console.log('=' .repeat(50));

  const issuerSecret = config.get<string>('STELLAR_SECRET_KEY');
  const network = config.get<string>('STELLAR_NETWORK') || 'testnet';

  if (!issuerSecret || issuerSecret === 'your_stellar_secret_key_here') {
    console.log('❌ STELLAR_SECRET_KEY não configurada!');
    console.log('   Rode: npm run setup:issuer');
    process.exit(1);
  }

  try {
    const issuerKeypair = Keypair.fromSecret(issuerSecret);
    const issuerPublicKey = issuerKeypair.publicKey();

    console.log('\n📝 WALLET ISSUER (Emissor do Token REFEICAO)');
    console.log('-'.repeat(50));
    console.log(`Public Key: ${issuerPublicKey}`);
    console.log(`Network: ${network}`);
    console.log(`\n🔗 Explorer - CLIQUE AQUI:`);
    console.log(`   👉 https://stellar.expert/explorer/testnet/account/${issuerPublicKey}`);

    // Verificar saldo
    try {
      const balance = await stellarService.getBalance(issuerPublicKey);
      console.log(`\n💰 Saldo Issuer: ${balance} REFEICAO`);
    } catch (error) {
      console.log(`\n⚠️  Não foi possível consultar saldo do issuer`);
    }

    // Asset REFEICAO
    console.log('\n\n🪙 ASSET REFEICAO - CLIQUE PARA VER O TOKEN');
    console.log('-'.repeat(50));
    console.log(`Código: REFEICAO`);
    console.log(`Issuer: ${issuerPublicKey}`);
    console.log(`\n🔗 Explorer - CLIQUE AQUI:`);
    console.log(`   👉 https://stellar.expert/explorer/testnet/asset/REFEICAO-${issuerPublicKey}`);
    console.log(`\n💡 COPIE E COLE ESSE LINK NO NAVEGADOR!`);

    // Estações
    console.log('\n\n🏪 ESTAÇÕES');
    console.log('-'.repeat(50));
    const stations = await prisma.station.findMany({
      where: {
        stellarWallet: {
          not: '',
        },
      },
    });

    if (stations.length === 0) {
      console.log('⚠️  Nenhuma estação com wallet configurada');
      console.log('   Rode: npm run setup:stellar');
    } else {
      console.log(`Total: ${stations.length} estações com wallet\n`);
      stations.slice(0, 5).forEach((station, index) => {
        console.log(`${index + 1}. ${station.name}`);
        console.log(`   Wallet: ${station.stellarWallet}`);
        console.log(`   Explorer: https://stellar.expert/explorer/testnet/account/${station.stellarWallet}`);
        console.log('');
      });
      if (stations.length > 5) {
        console.log(`   ... e mais ${stations.length - 5} estações`);
      }
    }

    // Usuários Demo
    console.log('\n\n👥 USUÁRIOS DEMO');
    console.log('-'.repeat(50));
    const demoUsers: string[] = [];
    for (let i = 1; i <= 10; i++) {
      const secret = config.get<string>(`DEMO_USER_${i}_SECRET`);
      if (secret && secret !== '') {
        try {
          const keypair = Keypair.fromSecret(secret);
          demoUsers.push(keypair.publicKey());
        } catch (error) {
          // Ignorar
        }
      }
    }

    if (demoUsers.length === 0) {
      console.log('⚠️  Nenhum usuário demo configurado');
      console.log('   Rode: npm run setup:stellar');
      console.log('   E adicione DEMO_USER_*_SECRET no .env');
    } else {
      console.log(`Total: ${demoUsers.length} usuários demo\n`);
      for (let index = 0; index < Math.min(3, demoUsers.length); index++) {
        const wallet = demoUsers[index];
        console.log(`${index + 1}. Usuário Demo ${index + 1}`);
        console.log(`   Wallet: ${wallet}`);
        console.log(`   Explorer: https://stellar.expert/explorer/testnet/account/${wallet}`);
        try {
          const balance = await stellarService.getBalance(wallet);
          console.log(`   Saldo: ${balance} REFEICAO`);
        } catch (error) {
          console.log(`   Saldo: (erro ao consultar)`);
        }
        console.log('');
      }
    }

    // Transações recentes
    console.log('\n\n📊 TRANSAÇÕES RECENTES');
    console.log('-'.repeat(50));
    const transactions = await prisma.transaction.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { station: true },
    });

    if (transactions.length === 0) {
      console.log('Nenhuma transação ainda');
    } else {
      transactions.forEach((tx, index) => {
        console.log(`${index + 1}. ${tx.amount} REFEICAO`);
        console.log(`   De: ${tx.userWallet.substring(0, 8)}...`);
        console.log(`   Para: ${tx.station.name}`);
        console.log(`   Hash: ${tx.stellarTxHash}`);
        console.log(`   Explorer: https://stellar.expert/explorer/testnet/tx/${tx.stellarTxHash}`);
        console.log(`   Status: ${tx.status}`);
        console.log('');
      });
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Informações exibidas com sucesso!');
    console.log('\n💡 Dica: Use os links do Explorer para ver tudo na blockchain');

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();

