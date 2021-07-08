import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryResult, MovieResult } from '../catalogue.model';

export const MOVIE_BASE_URL = new InjectionToken<string>('movie api token');

@Injectable()

export class MovieApiService {
  constructor(@Inject(MOVIE_BASE_URL) private baseUrl: string, private http:HttpClient ) {
  }

  getMovieByName(name: String): Observable<MovieResult> {
    return this.http.get<MovieResult>(`${this.baseUrl}&t=${name}`); // API დან გამომდინარე, get დააბრუნებს observable ს
  }

  getMovieByImdbId(imdbId: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(`${this.baseUrl}&i=${imdbId}`)
  }

  getCountry(code: string): Observable<CountryResult> {
    return this.http.get<CountryResult>(`https://restcountries.eu/rest/v2/name/${code}?fullText=true`);
  }
}
