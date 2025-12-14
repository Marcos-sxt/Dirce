/**
 * Script SIMPLES - Só mostra os links do explorer
 * 
 * Uso: npx ts-node scripts/get-explorer-links.ts
 */

import * as dotenv from 'dotenv';
import { Keypair } from '@stellar/stellar-sdk';

dotenv.config({ path: '.env' });

const issuerSecret = process.env.STELLAR_SECRET_KEY;

if (!issuerSecret || issuerSecret === 'your_stellar_secret_key_here') {
  console.log('❌ STELLAR_SECRET_KEY não configurada no .env');
  console.log('   Rode: npm run setup:issuer');
  process.exit(1);
}

try {
  const keypair = Keypair.fromSecret(issuerSecret);
  const issuerPublicKey = keypair.publicKey();

  console.log('\n🔗 LINKS DO EXPLORER - COPIE E COLE NO NAVEGADOR\n');
  console.log('='.repeat(70));
  
  console.log('\n1️⃣  WALLET ISSUER (Quem emite os tokens):');
  console.log(`   👉 https://stellar.expert/explorer/testnet/account/${issuerPublicKey}`);
  
  console.log('\n2️⃣  ASSET REFEICAO (O token em si):');
  console.log(`   👉 https://stellar.expert/explorer/testnet/asset/REFEICAO-${issuerPublicKey}`);
  
  console.log('\n' + '='.repeat(70));
  console.log('\n💡 Dica: Copie os links acima e cole no navegador!');
  console.log('   Ou rode: npm run stellar:info (mostra mais informações)\n');

} catch (error: any) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}

