import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

export const routes: Route [] = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'catalogue',
    loadChildren: () => import('./catalogue/catalogue.module').then((m) => m.CatalogueModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
