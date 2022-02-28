import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subject } from 'rxjs';
import { Movie } from 'src/app/shared/models';
import { MovieState } from '../../states';
import { Router } from '@angular/router';
import {
  DeleteMovie,
  GetAllMovies,
  UpdateMovieListState,
  UpdateMovieState,
} from '../../actions';
// @ts-ignore
import alertify from 'alertifyjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  @Select(MovieState.movieList)
  movies$!: Observable<Movie[]>;

  sortedMovies$: Observable<Movie[]> = this.movies$.pipe(
    filter((data) => !!data?.length),
    map((x) => x.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1)))
  );
  hoverIdx = -1;

  searchText = '';
  filter = 'default';

  listPagination = 0;

  constructor(private store: Store, private router: Router) {}

  navigateUpdate(movie: Movie) {
    this.router.navigate([`/movie/update/${movie.id}`]);
  }

  changeFilter() {
    const movies = this.store.selectSnapshot(MovieState.allMovies);
    const updatedMovies = this.filterByReview(this.filter, movies);
    this.store.dispatch(new UpdateMovieState(updatedMovies));
  }

  private filterByReview(filterType: string, movies: Movie[]): Movie[] {
    if (filterType === 'low') {
      return movies.sort((a, b) => (a.review > b.review ? 1 : -1));
    } else if (filterType === 'high') {
      return movies.sort((a, b) => (a.review > b.review ? -1 : 1));
    } else {
      return movies.sort((a, b) =>
        new Date(a.date) > new Date(b.date) ? -1 : 1
      );
    }
  }

  viewMore() {
    this.listPagination = this.listPagination + 1;
    const movies = this.store.selectSnapshot(MovieState.movieList);
    const chunk = this.store.selectSnapshot(MovieState.chunkMovies)[
      this.listPagination
    ];
    this.store.dispatch(new UpdateMovieListState([...movies, ...chunk]));
  }

  delete(movie: Movie) {
    alertify.confirm(
      'Film Sil',
      'Silmek istediğinize emin misiniz ?',
      (e: any) => {
        if (e) {
          this.store.dispatch(new DeleteMovie(movie)).subscribe({
            next: () => {
              this.store.dispatch(new GetAllMovies());
              alertify.success(
                `${movie.name} filmi silinmiştir.'
          }`
              );
            },
          });
        }
      },
      (e: any) => {}
    );
  }
}
