import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MovieService } from '../services';
import {
  Movie,
  MovieStateModel,
  OmdbSearchResult,
} from 'src/app/shared/models';
import {
  DeleteMovie,
  GetAllMovies,
  GetMovieById,
  SaveMovie,
  SearchMovies,
  UpdateMovie,
  UpdateMovieListState,
  UpdateMovieState,
} from '../actions';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { chunks } from '../../shared/utils/common.utils';

@Injectable()
@State<MovieStateModel>({
  name: 'MovieState',
  defaults: {
    movies: [],
    omdbMovieResult: {} as OmdbSearchResult,
    getMovieByIdResponse: {} as Movie,
    movieList: [],
  },
})
export class MovieState {
  constructor(private movieService: MovieService) {}

  @Selector()
  static allMovies({ movies }: MovieStateModel) {
    return movies;
  }

  @Selector()
  static movieList({ movieList }: MovieStateModel) {
    return movieList;
  }

  @Selector()
  static chunkMovies({ movies }: MovieStateModel) {
    return chunks(movies);
  }

  @Selector()
  static searchMovieResponse({ omdbMovieResult }: MovieStateModel) {
    return {
      ...omdbMovieResult,
      Search: omdbMovieResult.Search.map((search) => ({
        ...search,
        Poster: search.Poster.replace('300', '200'),
      })),
    };
  }

  @Selector()
  static movieById({ getMovieByIdResponse }: MovieStateModel) {
    return getMovieByIdResponse;
  }

  @Action(GetAllMovies)
  createIssue({ patchState }: StateContext<MovieStateModel>) {
    return this.movieService.getAllMovies().pipe(
      tap((movies) => {
        patchState({ movies });
        const [first] = chunks(movies);
        patchState({
          movieList: first,
        });
      })
    );
  }

  @Action(SearchMovies)
  searchMovies(
    { patchState }: StateContext<MovieStateModel>,
    { payload }: SearchMovies
  ) {
    return this.movieService.searchMovies(payload).pipe(
      tap((omdbMovieResult) => {
        patchState({ omdbMovieResult });
      })
    );
  }

  @Action(SaveMovie)
  saveMovie(
    { patchState }: StateContext<MovieStateModel>,
    { payload }: SaveMovie
  ) {
    return this.movieService.createMovie(payload);
  }

  @Action(UpdateMovie)
  updateMovie(
    { patchState }: StateContext<MovieStateModel>,
    { payload }: UpdateMovie
  ) {
    return this.movieService.updateMovie(payload);
  }

  @Action(DeleteMovie)
  deleteMovie(
    { patchState }: StateContext<MovieStateModel>,
    { payload }: DeleteMovie
  ) {
    return this.movieService.deleteMovie(payload);
  }

  @Action(GetMovieById)
  getMovieById(
    { patchState }: StateContext<MovieStateModel>,
    { payload }: GetMovieById
  ) {
    return this.movieService.getById(payload).pipe(
      tap((getMovieByIdResponse) => {

        patchState({ getMovieByIdResponse });
      })
    );
  }

  @Action(UpdateMovieState)
  updateMovieState(
    { patchState }: StateContext<MovieStateModel>,
    { payload }: UpdateMovieState
  ) {
    return patchState({ movies: payload });
  }

  @Action(UpdateMovieListState)
  updateMovieListState(
    { patchState }: StateContext<MovieStateModel>,
    { payload }: UpdateMovieListState
  ) {
    console.log(payload);
    return patchState({ movieList: payload });
  }
}
