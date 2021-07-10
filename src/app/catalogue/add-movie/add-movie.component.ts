import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { AddMovieBody, Country, Movie, MovieResult, RATINGS, Status, WhenToWatchSelect, WHEN_TO_WATCH } from '../catalogue.model';
import { MovieApiService } from '../services/movie-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FireApiService } from '../services/fire-api.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  searchKey: string;
  hasError: boolean;

  lastThreeSearches: string[] = [];

  form: FormGroup;

  status = Status;

  submitted = false;

  successAddMovie = false;

  get whenToWatch(): WhenToWatchSelect[] {
    return WHEN_TO_WATCH;
  }

  get ratings(): number[] {
    return RATINGS;
  }

  get canWatchLater(): boolean {
    return !!this.form.get('whenToWatch');
  }

  private _selectedMovie: Movie;
  get selectedMovie(): Movie {
    return this._selectedMovie;
  }

  constructor(private movieApiService: MovieApiService,
    private storage: StorageService,
    private fb: FormBuilder,
    private fireApiService: FireApiService,
    private auth: AuthService) { }

  private addToLastSearches(name: string) {
    if (this.lastThreeSearches.length < 3) {
      this.lastThreeSearches = [name, ...this.lastThreeSearches];
      return;
    }

    this.lastThreeSearches = [name, ...this.lastThreeSearches.slice(0, 2)];

    this.storage.set('lastThreeSearches', this.lastThreeSearches)
  }

  private getCountryWithPopulation(code: string): Observable<Country> {
    return this.movieApiService.getCountry(code)
      .pipe(map((c) => {
        const country = c[0];
        return {
          code: country.alpha2Code,
          population: country.population,
        };
      }),
      catchError((error) => {return of(null);})
      );
  }

  private mapMovie(movie: MovieResult, countries: Country[]): Movie {
    return {
       actors: movie.Actors,
       countries,
       director: movie.Director,
       genre: movie.Genre.split(', '),
       imdbId: movie.imdbID,
       plot: movie.Plot,
       poster: movie.Poster,
       title: movie.Title,
       year: movie.Year,
    }
  }

  getPopulation(country: Country): string {
    return `Population of ${country.code}: ${country.population}`;
  }

  fetchMovie(name: string) {
    this.movieApiService.getMovieByName(name)
    .pipe(finalize(() => { this.searchKey = '' }),
    switchMap(movie => {
      const countries = movie.Country.split(', ');
      return forkJoin(
        countries.map((code) =>this.getCountryWithPopulation(code)))
        .pipe(map<Country[], Movie>(countries =>this.mapMovie(movie, countries)))
     })
     )
     .subscribe((movie) => (this._selectedMovie = movie));
  }


  search(key: string) {
    if (!key) {
      this.hasError = true;
      return
    }

    this.hasError = false;

    this.addToLastSearches(key);
    this.fetchMovie(key);
  }

  private restoreState() {
    const lastThreeSearches = this.storage.get<string[]>('lastThreeSearches');
    if (lastThreeSearches?.length > 0) {
      this.lastThreeSearches = lastThreeSearches;
    }
  }

  private createForm() {
    this.form = this.fb.group({
      review: ['', [Validators.required, Validators.minLength(10)]],
      rating: 1,
      status: Status.Watched,
    });
  }


  submit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    const value =  this.form.value;

    const body: AddMovieBody = {
      imdbId: this._selectedMovie.imdbId,
      uid: this.auth.userId,
      rating: value.rating,
      review: value.review,
      status: value.status,
      whenToWatch: value.whenToWatch || '',
    }

    this.fireApiService.addMovie(body).subscribe(() => this.reset());
  }


  private reset() {
    this._selectedMovie = null;
    this.form.reset();

    this.form.updateValueAndValidity();
    this.submitted = false;

    this.successAddMovie = true;
  }

  private addControlsByStatus(status: Status) {
    switch (status) {
      case Status.WatchLater:
        this.form.addControl('whenToWatch', new FormControl([''], Validators.required));
        break;
      case Status.Watched:
        this.form.removeControl('whenToWatch');
        break;
    }
  }

  ngOnInit(): void {
    this.restoreState();
    this.createForm();
    this.form.get('status').valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(status => this.addControlsByStatus(status));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
