export interface ICar {
  name: string;
  color: string;
  id?: number;
  time?: number;
  wins?: number;
}

export interface IEngineStatus {
  velocity: number;
  distance: number;
}

export interface IAllCars {
  cars: Array<ICar>;
  count: string;
}
