import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { MovieListResolver, UpdateMovieResolver } from './resolvers';

const routes: Routes = [
  {
    path: 'list',
    component: MovieListComponent,
    resolve: [MovieListResolver],
  },
  {
    path: 'add',
    component: AddMovieComponent,
  },
  {
    path: 'update/:id',
    component: AddMovieComponent,
    resolve: [UpdateMovieResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MovieListResolver, UpdateMovieResolver],
})
export class MovieRoutingModule {}
