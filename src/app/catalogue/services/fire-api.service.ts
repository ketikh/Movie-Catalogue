import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AddMovieBody, MovieWithId } from '../catalogue.model';


@Injectable()

export class FireApiService {
  constructor(private store: AngularFirestore,private auth: AuthService) {
  }

  addMovie(body: AddMovieBody) {
    return from(this.store.collection('catalogue').add(body));
  }

  getMovies(): Observable<MovieWithId[]> {
    return this.store
      .collection<AddMovieBody>('catalogue', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .get()
      .pipe(
        map((res) =>
          res.docs.map<MovieWithId>((d) => ({ ...d.data(), id: d.id }))
        )
      );
  }

  getMovie(id: string): Observable<AddMovieBody> {
    return this.store
      .collection<AddMovieBody>('catalogue', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .doc(id)
      .get()
      .pipe(map((res) => res.data()));
  }
}
