import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MovieState } from '../../states';
import { map, Observable } from 'rxjs';
import { Movie, OmdbMovie, OmdbSearchResult } from '../../../shared/models';
import { SaveMovie, SearchMovies, UpdateMovie } from '../../actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// @ts-ignore
import alertify from 'alertifyjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  @Select(MovieState.searchMovieResponse)
  omdbResult$!: Observable<OmdbSearchResult>;

  form!: FormGroup;

  isUpdate = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.isUpdate = this.router.url.includes('update');
    this.buildForm();
  }

  search(event: any) {
    this.store.dispatch(new SearchMovies(event.term));
  }

  change() {
    this.form.patchValue({
      title: this.form.value.selectedMovie.Title,
      image: this.form.value.selectedMovie.Poster,
      id: this.form.value.selectedMovie.imdbID,
    });
  }

  save() {
    this.store
      .dispatch(
        this.isUpdate
          ? new UpdateMovie(this.transformFormToRequest())
          : new SaveMovie(this.transformFormToRequest())
      )
      .subscribe({
        next: () => {
          alertify.success(
            `${this.transformFormToRequest().name} filmi ${
              this.isUpdate ? 'güncellenmiştir.' : 'eklenmiştir.'
            }`
          );
        },
      });
  }

  private transformFormToRequest(): Movie {
    return {
      image: this.form.value.image,
      review: this.form.value.review,
      id: this.form.value.id,
      name: this.form.value.title,
      date: new Date(Date.now()),
    };
  }

  private buildForm() {
    const movie = this.store.selectSnapshot(MovieState.movieById);
    this.form = this.fb.group({
      selectedMovie: [null],
      id: [movie?.id],
      title: [movie?.name],
      image: [movie?.image],
      review: [
        movie?.review,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }
}
