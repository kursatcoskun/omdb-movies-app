import { OmdbMovie } from './omdb-movie';

export interface OmdbSearchResult {
  Search: OmdbMovie[];
  totalResults: number;
  Response: boolean;
}
