import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieApiService, MOVIE_BASE_URL } from './services/movie-api.service';
import { environment } from 'src/environments/environment';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieListItemComponent } from './movie-list/movie-list-item/movie-list-item.component';
import { FireApiService } from './services/fire-api.service';
import { SharedModule } from '../shared/shared.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@NgModule({
  declarations: [
    CatalogueComponent,
    AddMovieComponent,
    MovieListComponent,
    MovieListItemComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [MovieApiService, FireApiService,{
    provide: MOVIE_BASE_URL,
    useValue: environment.movieApiBase
  }],

})
export class CatalogueModule { }
