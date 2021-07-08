import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { CatalogueComponent } from './catalogue.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Route [] = [
  {
    path: '',
    component: CatalogueComponent,
  },
  {
    path: 'add',
    component: AddMovieComponent,
  },
  {
    path: ':id', // : კომპონენტიდან რომ მიწვდეს პარამეტრად id
    component: MovieDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogueRoutingModule {}
