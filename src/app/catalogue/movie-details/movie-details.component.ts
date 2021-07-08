import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, finalize, switchMap, tap } from 'rxjs/operators';
import { AddMovieBody, MovieResult } from '../catalogue.model';
import { FireApiService } from '../services/fire-api.service';
import { MovieApiService } from '../services/movie-api.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  storeData$: Observable<AddMovieBody>;
  movieData$: Observable<MovieResult>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireApiService: FireApiService,
    private movieApiService: MovieApiService,
    private router: Router
  ) {}

  private initMovieDetails() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.storeData$ = this.fireApiService
      .getMovie(id)
      .pipe(
        tap(
          (movie) =>
            (this.movieData$ = this.movieApiService
              .getMovieByImdbId(movie.imdbId)
              )
        )
      );
  }

  goBack() {
    this.router.navigate(['catalogue']);
  }

  ngOnInit() {
    this.initMovieDetails();
  }
}
