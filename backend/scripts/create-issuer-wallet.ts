/**
 * Script para criar wallet issuer do Stellar
 * 
 * Uso: npx ts-node scripts/create-issuer-wallet.ts
 */

const { Keypair } = require('@stellar/stellar-sdk');

console.log('🔑 Gerando wallet issuer para Stellar...\n');

const keypair = Keypair.random();

console.log('✅ Wallet criada!\n');
console.log('📋 Adicione essas informações no seu .env:\n');
console.log(`STELLAR_SECRET_KEY=${keypair.secret()}`);
console.log(`STELLAR_ISSUER_WALLET=${keypair.publicKey()}\n`);
console.log('⚠️  IMPORTANTE: Guarde a secret key em local seguro!');
console.log('   Ela será usada para emitir tokens REFEICAO.\n');

