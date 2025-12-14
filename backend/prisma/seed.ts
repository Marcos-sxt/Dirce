import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  // Estações de alimentação no Rio de Janeiro (coordenadas reais)
  const stations = [
    // Zona Sul - RJ
    {
      name: 'Restaurante Popular Copacabana',
      address: 'Rua Barata Ribeiro, 200 - Copacabana, Rio de Janeiro - RJ',
      latitude: -22.9711,
      longitude: -43.1822,
      stellarWallet: '',
    },
    {
      name: 'Cozinha Comunitária Ipanema',
      address: 'Rua Visconde de Pirajá, 500 - Ipanema, Rio de Janeiro - RJ',
      latitude: -22.9844,
      longitude: -43.1944,
      stellarWallet: '',
    },
    {
      name: 'Refeitório Social Botafogo',
      address: 'Rua Voluntários da Pátria, 300 - Botafogo, Rio de Janeiro - RJ',
      latitude: -22.9508,
      longitude: -43.1836,
      stellarWallet: '',
    },
    // Centro - RJ
    {
      name: 'Restaurante Popular Centro',
      address: 'Rua da Carioca, 100 - Centro, Rio de Janeiro - RJ',
      latitude: -22.9068,
      longitude: -43.1729,
      stellarWallet: '',
    },
    {
      name: 'Casa de Alimentação Lapa',
      address: 'Rua do Lavradio, 200 - Lapa, Rio de Janeiro - RJ',
      latitude: -22.9111,
      longitude: -43.1800,
      stellarWallet: '',
    },
    // Zona Norte - RJ
    {
      name: 'Restaurante Popular Tijuca',
      address: 'Rua Conde de Bonfim, 1000 - Tijuca, Rio de Janeiro - RJ',
      latitude: -22.9258,
      longitude: -43.2400,
      stellarWallet: '',
    },
    {
      name: 'Cozinha Comunitária Méier',
      address: 'Rua Dias da Cruz, 500 - Méier, Rio de Janeiro - RJ',
      latitude: -22.9000,
      longitude: -43.2800,
      stellarWallet: '',
    },
    // Zona Oeste - RJ
    {
      name: 'Refeitório Social Barra da Tijuca',
      address: 'Avenida das Américas, 2000 - Barra da Tijuca, Rio de Janeiro - RJ',
      latitude: -23.0065,
      longitude: -43.3644,
      stellarWallet: '',
    },
    {
      name: 'Restaurante Popular Campo Grande',
      address: 'Rua Dom Pedro II, 500 - Campo Grande, Rio de Janeiro - RJ',
      latitude: -22.9000,
      longitude: -43.5600,
      stellarWallet: '',
    },
    // Zona Norte - RJ (mais estações)
    {
      name: 'Casa de Alimentação Madureira',
      address: 'Rua Carolina Machado, 300 - Madureira, Rio de Janeiro - RJ',
      latitude: -22.8700,
      longitude: -43.3400,
      stellarWallet: '',
    },
    {
      name: 'Restaurante Popular Penha',
      address: 'Rua Itapiru, 500 - Penha, Rio de Janeiro - RJ',
      latitude: -22.8200,
      longitude: -43.2900,
      stellarWallet: '',
    },
    {
      name: 'Cozinha Comunitária Bonsucesso',
      address: 'Rua Teixeira Ribeiro, 200 - Bonsucesso, Rio de Janeiro - RJ',
      latitude: -22.8500,
      longitude: -43.2500,
      stellarWallet: '',
    },
    {
      name: 'Refeitório Social Ramos',
      address: 'Rua Uranos, 100 - Ramos, Rio de Janeiro - RJ',
      latitude: -22.8800,
      longitude: -43.2200,
      stellarWallet: '',
    },
  ];

  console.log(`📦 Criando ${stations.length} estações...`);

  for (const station of stations) {
    // Verificar se já existe
    const existing = await prisma.station.findFirst({
      where: { name: station.name },
    });

    if (existing) {
      // Atualizar se existir
      const updated = await prisma.station.update({
        where: { id: existing.id },
        data: {
          address: station.address,
          latitude: station.latitude,
          longitude: station.longitude,
        },
      });
      console.log(`   ⏭️  ${updated.name} (atualizada)`);
    } else {
      // Criar se não existir
      const created = await prisma.station.create({
        data: station,
      });
      console.log(`   ✅ ${created.name}`);
    }
  }

  console.log(`\n✅ Seed concluído! ${stations.length} estações criadas.`);
  console.log('\n💡 Próximo passo: Rode o script de setup Stellar para criar wallets:');
  console.log('   npx ts-node scripts/setup-stellar.ts\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

