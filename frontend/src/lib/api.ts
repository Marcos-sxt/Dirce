/**
 * Cliente API para comunicação com backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export interface GeocodeResult {
  lat: number;
  lng: number;
  formattedAddress: string;
}

export interface Station {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  stellarWallet?: string;
  distance?: number;
  time?: number;
}

export interface NearbyStationsParams {
  lat: number;
  lng: number;
  radius?: number;
  limit?: number;
}

/**
 * Busca estações próximas
 */
export async function getNearbyStations(params: NearbyStationsParams): Promise<Station[]> {
  try {
    const { lat, lng, radius = 5000, limit = 10 } = params;
    const url = `${API_URL}/stations/nearby?lat=${lat}&lng=${lng}&radius=${radius}&limit=${limit}`;
    
    console.log('🔍 Buscando estações:', url);
    
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro na resposta:', response.status, errorText);
      throw new Error(`Erro ao buscar estações: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 Dados recebidos do backend:', data);
    return data;
  } catch (error) {
    console.error('❌ Erro ao buscar estações:', error);
    // Retornar array vazio em caso de erro (frontend pode usar dados mockados)
    return [];
  }
}

/**
 * Busca todas as estações
 */
export async function getAllStations(): Promise<Station[]> {
  try {
    const response = await fetch(`${API_URL}/stations`);

    if (!response.ok) {
      throw new Error('Erro ao buscar estações');
    }

    return response.json();
  } catch (error) {
    console.error('Erro ao buscar estações:', error);
    return [];
  }
}

/**
 * Busca estação por ID
 */
export async function getStationById(id: string): Promise<Station | null> {
  try {
    console.log('🔍 Buscando estação por ID:', id);
    const response = await fetch(`${API_URL}/stations/${id}`);

    if (!response.ok) {
      throw new Error('Estação não encontrada');
    }

    const data = await response.json();
    console.log('📦 Estação encontrada:', data);
    return data;
  } catch (error) {
    console.error('❌ Erro ao buscar estação:', error);
    return null;
  }
}

/**
 * Text-to-Speech via backend
 */
export async function textToSpeech(text: string, flash: boolean = false): Promise<Blob> {
  try {
    const response = await fetch(`${API_URL}/elevenlabs/text-to-speech`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, flash }),
    });

    if (!response.ok) {
      throw new Error('Erro ao gerar áudio');
    }

    return response.blob();
  } catch (error) {
    console.error('Erro ao gerar áudio:', error);
    throw error;
  }
}

/**
 * Speech-to-Text via backend (fallback se Web Speech API não funcionar)
 */
export async function speechToText(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    const response = await fetch(`${API_URL}/elevenlabs/speech-to-text`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao processar áudio');
    }

    const data = await response.json();
    return data.text || '';
  } catch (error) {
    console.error('Erro ao processar áudio:', error);
    throw error;
  }
}

/**
 * Geocoding: Converte endereço em coordenadas (lat/lng)
 * Usa Google Maps Geocoding API
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('⚠️ Google Maps API Key não configurada. Usando coordenadas mockadas.');
    // Fallback: coordenadas do Rio de Janeiro (centro)
    return {
      lat: -22.9068,
      lng: -43.1729,
      formattedAddress: address,
    };
  }

  try {
    // Adicionar "Rio de Janeiro, RJ, Brasil" para melhorar precisão
    const fullAddress = address.includes('Rio de Janeiro') || address.includes('RJ')
      ? address 
      : `${address}, Rio de Janeiro, RJ, Brasil`;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${GOOGLE_MAPS_API_KEY}&region=br`
    );

    if (!response.ok) {
      throw new Error('Erro ao geocodificar endereço');
    }

    const data = await response.json();

    if (data.status === 'ZERO_RESULTS') {
      throw new Error('Endereço não encontrado');
    }

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      throw new Error(`Erro no geocoding: ${data.status}`);
    }

    const result = data.results[0];
    const location = result.geometry.location;

    return {
      lat: location.lat,
      lng: location.lng,
      formattedAddress: result.formatted_address,
    };
  } catch (error) {
    console.error('Erro ao geocodificar endereço:', error);
    // Fallback: coordenadas do Rio de Janeiro (centro)
    return {
      lat: -22.9068,
      lng: -43.1729,
      formattedAddress: address,
    };
  }
}

