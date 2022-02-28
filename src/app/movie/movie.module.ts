import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './components';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, MovieRoutingModule, NgSelectModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [MovieComponent, MovieListComponent, AddMovieComponent],
})
export class MovieModule {}
