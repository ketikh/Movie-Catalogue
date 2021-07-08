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
    // from(this.store.collection('catalogue').add(body)).subscribe(() => this.reset());
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
      ) // ამ იუზერის კოლექციას დავფილტრავ
      .doc(id) // წამოიღე ის დოკუმენტი მხოლოდ რომლის აიდიც გადავეცი
      .get()
      .pipe(map((res) => res.data()));
  }
//მიმართავს არსებულ კატალოგის კოლექციას და თუ არ არსებობს შექმნის,
//ამოიღე ის წევრები რომლის იუზერ აიდი არის მიმდინარე იუზერის აიდის
//ტოლი და  დააბრუნე მისი ვალიუჩეინჯები და როცა რამე შეიცვლება განახლდება
}
