import {Movie, OmdbSearchResult} from '.';

export interface MovieStateModel {
  movies: Movie[];
  omdbMovieResult: OmdbSearchResult;
  getMovieByIdResponse: Movie;
  movieList: Movie[];
}
