import type { Station } from "@/components/StationCard";

export const mockStations: Station[] = [
  {
    id: "1",
    name: "Restaurante Popular Centro",
    address: "Rua XV de Novembro, 1000 - Centro",
    distance: 500,
    time: 5,
  },
  {
    id: "2",
    name: "Cozinha Comunitária Vila Torres",
    address: "Rua da Cidadania Vila Torres, 200",
    distance: 800,
    time: 10,
  },
  {
    id: "3",
    name: "Refeitório Social Boqueirão",
    address: "Av. Marechal Floriano Peixoto, 3500",
    distance: 1200,
    time: 15,
  },
  {
    id: "4",
    name: "Casa de Alimentação Pinheirinho",
    address: "Rua Winston Churchill, 1550",
    distance: 2000,
    time: 25,
  },
];

export const mockLocation = {
  address: "Praça Tiradentes, 100",
  neighborhood: "Centro",
  city: "Curitiba",
};
