import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './components';
import { AddMovieComponent } from './components/add-movie/add-movie.component';

@NgModule({
  imports: [CommonModule, MovieRoutingModule],
  declarations: [MovieComponent, MovieListComponent, AddMovieComponent],
})
export class MovieModule {}
