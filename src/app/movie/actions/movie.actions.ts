import { Movie } from '../../shared/models';

export class GetAllMovies {
  static readonly type = '[Movie] Get All Movies';
}
export class UpdateMovieState {
  static readonly type = '[Movie] Update Movie State';
  public constructor(public payload: Movie[]) {}
}
export class UpdateMovieListState {
  static readonly type = '[Movie] Update Movie List State';
  public constructor(public payload: Movie[]) {}
}
export class DeleteMovie {
  static readonly type = '[Movie] Delete Movie';
  public constructor(public payload: Movie) {}
}
export class SearchMovies {
  static readonly type = '[Movie] Search Movies';
  public constructor(public payload: string) {}
}

export class SaveMovie {
  static readonly type = '[Movie] Save Movie';
  public constructor(public payload: Movie) {}
}

export class UpdateMovie {
  static readonly type = '[Movie] Update Movie';
  public constructor(public payload: Movie) {}
}

export class GetMovieById {
  static readonly type = '[Movie] Get Movie By Id';
  public constructor(public payload: string) {}
}
