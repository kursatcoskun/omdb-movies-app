import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MovieService } from '../services';
import { MovieStateModel } from 'src/app/shared/models';
import { GetAllMovies } from '../actions';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
@State<MovieStateModel>({
  name: 'MovieState',
  defaults: {
    movies: [],
  },
})
export class MovieState {
  constructor(private movieService: MovieService) {}

  @Selector()
  static allMovies({ movies }: MovieStateModel) {
    return movies;
  }

  @Action(GetAllMovies)
  createIssue({ patchState }: StateContext<MovieStateModel>) {
    return this.movieService.getAllMovies().pipe(
      tap((movies) => {
        patchState({ movies });
      })
    );
  }
}
