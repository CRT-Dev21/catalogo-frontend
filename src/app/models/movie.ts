export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
}

export interface MovieRequest {
  title: string;
  synopsis: string;
  year: number;
  cover: string;
}
