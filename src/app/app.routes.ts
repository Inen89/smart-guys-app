import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'smart-guys',
    loadComponent: () =>
      import('./components/user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
  { path: '**', component: ErrorComponent },
];
