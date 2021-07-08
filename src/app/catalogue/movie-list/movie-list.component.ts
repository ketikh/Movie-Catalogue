import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MovieListItem, MovieResult, MovieWithId } from '../catalogue.model';
import { FireApiService } from '../services/fire-api.service';
import { MovieApiService } from '../services/movie-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies$: Observable<MovieListItem[]>;

  constructor(
    private fireApiService: FireApiService,
    private movieApiService: MovieApiService
  ) {}

  private mapMovieData(data: MovieWithId[]) {
    return data.map((d) =>
      this.movieApiService.getMovieByImdbId(d.imdbId).pipe(
        map<MovieResult, MovieListItem>((movie) => ({
          data: d,
          movie,
        }))
      )
    );
  }

  ngOnInit() {
    this.movies$ = this.fireApiService
      .getMovies()
      .pipe(switchMap((data) => forkJoin(this.mapMovieData(data))));
  }
}
