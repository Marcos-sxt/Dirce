import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StationsService {
  constructor(private prisma: PrismaService) {}

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
    // Busca todas as estações
    const allStations = await this.prisma.station.findMany();

    // Calcula distância para todas as estações
    const stationsWithDistance = allStations
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
  async findById(id: string) {
    return this.prisma.station.findUnique({
      where: { id },
    });
  }

  /**
   * Lista todas as estações
   */
  async findAll() {
    return this.prisma.station.findMany();
  }
}
