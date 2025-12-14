import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface Station {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  stellarWallet: string;
}

@Injectable()
export class StationsService {
  private stations: Station[] = [];

  constructor() {
    // Carregar estações do arquivo JSON
    this.loadStations();
  }

  private loadStations() {
    try {
      // Tentar diferentes caminhos (desenvolvimento e produção)
      const possiblePaths = [
        path.join(__dirname, '../../data/stations.json'), // Build (dist/data/)
        path.join(__dirname, '../data/stations.json'), // Build alternativo
        path.join(__dirname, '../../src/data/stations.json'), // Desenvolvimento
        path.join(process.cwd(), 'src/data/stations.json'), // Fallback desenvolvimento
        path.join(process.cwd(), 'data/stations.json'), // Fallback build
      ];

      let stationsData: string | null = null;
      for (const stationsPath of possiblePaths) {
        if (fs.existsSync(stationsPath)) {
          stationsData = fs.readFileSync(stationsPath, 'utf-8');
          break;
        }
      }

      if (!stationsData) {
        throw new Error('Arquivo stations.json não encontrado em nenhum caminho');
      }

      this.stations = JSON.parse(stationsData);
      console.log(`✅ ${this.stations.length} estações carregadas do JSON`);
    } catch (error) {
      console.error('❌ Erro ao carregar estações do JSON:', error);
      // Fallback: estações vazias
      this.stations = [];
    }
  }

  /**
   * Calcula distância entre dois pontos usando fórmula de Haversine
   * Retorna distância em metros
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371000; // Raio da Terra em metros
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Busca estações próximas a uma localização
   * Sempre retorna as N mais próximas, mesmo que estejam além do raio
   * @param latitude Latitude do ponto de referência
   * @param longitude Longitude do ponto de referência
   * @param radius Raio de busca em metros (padrão: 5000m = 5km) - usado apenas como preferência
   * @param limit Número máximo de resultados (padrão: 5)
   */
  async findNearby(
    latitude: number,
    longitude: number,
    radius: number = 5000,
    limit: number = 5,
  ) {
    // Calcula distância para todas as estações
    const stationsWithDistance = this.stations
      .map((station) => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          station.latitude,
          station.longitude,
        );
        return {
          ...station,
          distance: Math.round(distance), // Distância em metros
        };
      })
      .sort((a, b) => a.distance - b.distance); // Ordena por distância

    // Primeiro tenta pegar dentro do raio
    const withinRadius = stationsWithDistance.filter(
      (station) => station.distance <= radius,
    );

    // Se tiver menos que o limite dentro do raio, pega as mais próximas mesmo fora do raio
    if (withinRadius.length >= limit) {
      return withinRadius.slice(0, limit);
    } else {
      // Retorna as N mais próximas, mesmo que estejam além do raio
      return stationsWithDistance.slice(0, limit);
    }
  }

  /**
   * Busca estação por ID
   */
  async findById(id: string): Promise<Station | null> {
    return this.stations.find((station) => station.id === id) || null;
  }

  /**
   * Lista todas as estações
   */
  async findAll(): Promise<Station[]> {
    return this.stations;
  }
}
