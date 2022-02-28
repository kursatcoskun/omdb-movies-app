import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { MovieStateModel } from 'src/app/shared/models';
import { GetAllMovies } from '../actions';

@Injectable()
export class MovieListResolver implements Resolve<MovieStateModel> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MovieStateModel> {
    return this.store.dispatch(new GetAllMovies());
  }
}
