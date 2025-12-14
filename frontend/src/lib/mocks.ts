/**
 * Sistema de Mocks - Funciona 100% offline
 * Todas as APIs são mockadas para funcionar sem backend
 */

import { Station } from './api';
import { mockStations } from '@/data/mockStations';

// Estações mockadas completas (com coordenadas)
const mockStationsWithCoords: Station[] = [
  {
    id: "1",
    name: "Restaurante Popular Copacabana",
    address: "Rua Barata Ribeiro, 200 - Copacabana, Rio de Janeiro - RJ",
    latitude: -22.9711,
    longitude: -43.1822,
    stellarWallet: "",
  },
  {
    id: "2",
    name: "Cozinha Comunitária Ipanema",
    address: "Rua Visconde de Pirajá, 500 - Ipanema, Rio de Janeiro - RJ",
    latitude: -22.9844,
    longitude: -43.1944,
    stellarWallet: "",
  },
  {
    id: "3",
    name: "Refeitório Social Botafogo",
    address: "Rua Voluntários da Pátria, 300 - Botafogo, Rio de Janeiro - RJ",
    latitude: -22.9508,
    longitude: -43.1836,
    stellarWallet: "",
  },
  {
    id: "4",
    name: "Restaurante Popular Centro",
    address: "Rua da Carioca, 100 - Centro, Rio de Janeiro - RJ",
    latitude: -22.9068,
    longitude: -43.1729,
    stellarWallet: "",
  },
  {
    id: "5",
    name: "Casa de Alimentação Lapa",
    address: "Rua do Lavradio, 200 - Lapa, Rio de Janeiro - RJ",
    latitude: -22.9111,
    longitude: -43.18,
    stellarWallet: "",
  },
];

/**
 * Calcula distância entre dois pontos (Haversine)
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Raio da Terra em metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distância em metros
}

/**
 * Mock: Busca estações próximas
 */
export async function mockGetNearbyStations(
  lat: number,
  lng: number,
  radius: number = 50000,
  limit: number = 5
): Promise<Station[]> {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 300));

  // Calcular distância para cada estação e adicionar ao resultado
  const stationsWithDistance = mockStationsWithCoords.map(station => {
    const distance = calculateDistance(lat, lng, station.latitude, station.longitude);
    return {
      ...station,
      distance: Math.round(distance),
    };
  });

  // Filtrar por raio e ordenar por distância
  const nearby = stationsWithDistance
    .filter(s => s.distance <= radius)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, limit);

  console.log('🎭 Mock: Estações próximas encontradas:', nearby.length);
  return nearby;
}

/**
 * Mock: Busca todas as estações
 */
export async function mockGetAllStations(): Promise<Station[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockStationsWithCoords;
}

/**
 * Mock: Busca estação por ID
 */
export async function mockGetStationById(id: string): Promise<Station | null> {
  await new Promise(resolve => setTimeout(resolve, 150));
  const station = mockStationsWithCoords.find(s => s.id === id);
  return station || null;
}

/**
 * Mock: Geocoding (já retorna coordenadas mockadas)
 */
export function mockGeocodeAddress(address: string): { lat: number; lng: number; formattedAddress: string } {
  // Retornar coordenadas do Rio de Janeiro (centro)
  return {
    lat: -22.9068,
    lng: -43.1729,
    formattedAddress: address,
  };
}

