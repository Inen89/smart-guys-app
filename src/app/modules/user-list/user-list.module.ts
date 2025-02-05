import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserListComponent } from 'app/components/user-list/user-list.component';
import { RouterModule } from '@angular/router';

const routes = [{ path: '', component: UserListComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule, RouterModule.forChild(routes)],
})
export class UserListModule {
  constructor() {
    console.log('UserListModule loaded');
  }
}
