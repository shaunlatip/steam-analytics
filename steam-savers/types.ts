export interface Game {
    AppID: number;
    Name: string;
    Cluster: number;
  }
  
export interface GameResponse extends Game {
    message?: string;
}