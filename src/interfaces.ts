export interface ICar {
  name: string;
  color: string;
  id?: number;
  speed?: number;
  wins?: number;
}

export interface IEngineStatus {
  velocity: number;
  distance: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IAllCars {
  cars: Array<ICar>;
  count: string;
}
