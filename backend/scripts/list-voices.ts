import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../.env') });

const API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY || API_KEY === 'your_elevenlabs_api_key_here') {
  console.error('❌ ELEVENLABS_API_KEY não configurada no .env');
  process.exit(1);
}

async function listVoices() {
  try {
    console.log('🔍 Buscando vozes disponíveis na Eleven Labs...\n');
    
    const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': API_KEY,
      },
    });

    const voices = response.data.voices || [];
    
    console.log(`✅ Encontradas ${voices.length} vozes:\n`);
    
    // Procurar especificamente por "Dirce" (case insensitive)
    const dirceVoice = voices.find((v: any) => 
      v.name?.toLowerCase().includes('dirce')
    );
    
    if (dirceVoice) {
      console.log('🎯 VOZ DA DIRCE ENCONTRADA:');
      console.log('─'.repeat(60));
      console.log(`Nome: ${dirceVoice.name}`);
      console.log(`ID: ${dirceVoice.voice_id}`);
      console.log(`Categoria: ${dirceVoice.category || 'N/A'}`);
      console.log(`Descrição: ${dirceVoice.description || 'N/A'}`);
      console.log('─'.repeat(60));
      console.log(`\n✅ Use este ID no código: ${dirceVoice.voice_id}\n`);
    } else {
      console.log('⚠️  Voz "Dirce" não encontrada. Listando todas as vozes:\n');
    }
    
    // Listar todas as vozes
    voices.forEach((voice: any, index: number) => {
      const isDirce = voice.name?.toLowerCase().includes('dirce');
      const marker = isDirce ? '🎯' : `${index + 1}.`;
      
      console.log(`${marker} ${voice.name}`);
      console.log(`   ID: ${voice.voice_id}`);
      if (voice.description) {
        console.log(`   Descrição: ${voice.description}`);
      }
      console.log('');
    });
    
    // Sugestão de como usar
    console.log('\n📝 Para usar a voz da Dirce, atualize o arquivo:');
    console.log('   backend/src/elevenlabs/elevenlabs.service.ts');
    console.log('   Altere: defaultVoiceId = "SEU_VOICE_ID_AQUI"\n');
    
  } catch (error: any) {
    console.error('❌ Erro ao buscar vozes:', error.response?.data || error.message);
    process.exit(1);
  }
}

listVoices();

