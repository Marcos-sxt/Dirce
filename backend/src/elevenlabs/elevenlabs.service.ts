import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ElevenlabsService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.elevenlabs.io/v1';
  private readonly defaultVoiceId = 'vXiJkFosZDxUjhiIwLol'; // Dirce - voz feminina brasileira, calorosa e empática

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ELEVENLABS_API_KEY') || '';
    if (!this.apiKey || this.apiKey === 'your_elevenlabs_api_key_here') {
      console.warn('⚠️  Eleven Labs API Key não configurada. Configure ELEVENLABS_API_KEY no .env');
    }
  }

  /**
   * Speech-to-Text: Converte áudio em texto
   * @param audioBuffer Buffer do áudio
   * @returns Texto transcrito
   */
  async speechToText(audioBuffer: Buffer): Promise<string> {
    try {
      // Eleven Labs STT endpoint
      const response = await axios.post(
        `${this.baseUrl}/speech-to-text`,
        audioBuffer,
        {
          headers: {
            'xi-api-key': this.apiKey,
            'Content-Type': 'audio/mpeg', // Ajustar conforme formato do áudio
          },
        },
      );

      return response.data.text || '';
    } catch (error) {
      console.error('Eleven Labs STT Error:', error.response?.data || error.message);
      throw new Error('Falha ao processar áudio');
    }
  }

  /**
   * Text-to-Speech: Converte texto em áudio
   * @param text Texto para converter
   * @param voiceId ID da voz (opcional, usa padrão se não fornecido)
   * @returns Buffer do áudio gerado
   */
  async textToSpeech(text: string, voiceId?: string): Promise<Buffer> {
    try {
      const voice = voiceId || this.defaultVoiceId;

      const response = await axios.post(
        `${this.baseUrl}/text-to-speech/${voice}`,
        {
          text,
          model_id: 'eleven_multilingual_v2', // Modelo multilíngue
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        },
        {
          headers: {
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        },
      );

      return Buffer.from(response.data);
    } catch (error) {
      const errorMessage = error.response?.data 
        ? (typeof error.response.data === 'string' 
            ? error.response.data 
            : JSON.stringify(error.response.data))
        : error.message;
      console.error('Eleven Labs TTS Error:', errorMessage);
      throw new Error(`Falha ao gerar áudio: ${errorMessage}`);
    }
  }

  /**
   * Text-to-Speech com modelo Flash (baixa latência)
   * @param text Texto para converter
   * @param voiceId ID da voz (opcional)
   * @returns Buffer do áudio gerado
   */
  async textToSpeechFlash(text: string, voiceId?: string): Promise<Buffer> {
    try {
      const voice = voiceId || this.defaultVoiceId;

      const response = await axios.post(
        `${this.baseUrl}/text-to-speech/${voice}`,
        {
          text,
          model_id: 'eleven_flash_v2_5', // Modelo Flash para baixa latência
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        },
        {
          headers: {
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        },
      );

      return Buffer.from(response.data);
    } catch (error) {
      const errorMessage = error.response?.data 
        ? (typeof error.response.data === 'string' 
            ? error.response.data 
            : JSON.stringify(error.response.data))
        : error.message;
      console.error('Eleven Labs TTS Flash Error:', errorMessage);
      throw new Error(`Falha ao gerar áudio: ${errorMessage}`);
    }
  }
}
