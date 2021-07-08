import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shell';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard'

const redirectLoggedInToItems = () => redirectLoggedInTo(['catalogue']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);

export const routes: Route [] = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard], //თუ დააბრუნა false გადაგიშვებს სხვა გვერდზე
    data: { authGuardPipe: redirectLoggedInToItems },//გადაარედაქტირებს კატალოგზე თუ დალოგინებულია
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule), //lazy loading
  },
  {
    path: 'catalogue',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }, // როცა კატალოგზე შევა თუ არ არის დალოგინებული გადაამისამართებს ლოგინზე
    loadChildren: () => import('./catalogue/catalogue.module').then((m) => m.CatalogueModule),
  },
  {
    path: '**',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }, // როცა კატალოგზე შევა თუ არ არის დალოგინებული გადაამისამართებს ლოგინზე
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
