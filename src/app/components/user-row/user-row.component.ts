import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from 'app/models/user.model';

@Component({
  selector: 'tr[app-user-row]',
  imports: [FontAwesomeModule],
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
})
export class UserRowComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  onEdit() {
    this.edit.emit(this.user);
  }

  onDelete() {
    this.delete.emit(this.user);
  }
}
