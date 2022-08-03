export interface ICar {
  name: string;
  color: string;
  id?: number;
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
