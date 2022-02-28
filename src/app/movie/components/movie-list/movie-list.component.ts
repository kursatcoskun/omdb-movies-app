import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models';
import { MovieState } from '../../states';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @Select(MovieState.allMovies)
  movies$!: Observable<Movie[]>;
  hoverIdx = -1;

  constructor(private store: Store) { }

  ngOnInit() {
  }

}
