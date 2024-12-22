import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Input() user: User | null = null; //użytkownik do edycji
  @Output() userAdded = new EventEmitter<User>(); // Emitujemy zdarzenie po dodaniu użytkownika
  @Output() userUpdated = new EventEmitter<User>(); // Emitujemy zdarzenie po aktualizacji użytkownika
  @Output() cancelled = new EventEmitter<User>(); // Emitujemy anulowanie edycji/dodania użytkownika

  userForm: User = {
    id: 0,
    avatar: '',
    first_name: '',
    last_name: '',
    email: '',
  };

  constructor(private apiService: ApiService) {}

  private resetForm() {
    this.userForm = {
      id: 0,
      avatar: '',
      first_name: '',
      last_name: '',
      email: '',
    };
  }

  ngOnChanges() {
    // Wypełnienie userForm danymi, jeśli edytujemy użytkownika
    if (this.user) {
      this.userForm = { ...this.user };
    } else {
      this.resetForm();
    }
  }

  onSubmit() {
    if (
      this.userForm.first_name &&
      this.userForm.last_name &&
      this.userForm.email
    ) {
      if (this.user) {
        // Tworzymy nowy obiekt z danymi, które nie zostały zmienione
        const updatedUser: User = {
          ...this.user, // Kopiujemy stare dane
          first_name: this.userForm.first_name, // Zastępujemy tylko te, które zostały zmienione
          last_name: this.userForm.last_name,
          email: this.userForm.email,
        };

        // Wysyłamy zaktualizowanego użytkownika
        this.apiService
          .updateUser(this.userForm.id, updatedUser)
          .subscribe((response: User) => {
            this.userUpdated.emit(response); // Emitujemy zaktualizowanego użytkownika
            this.resetForm();
          });
      } else {
        // Jeśli dodajemy nowego użytkownika
        this.apiService
          .addUser({
            first_name: this.userForm.first_name,
            last_name: this.userForm.last_name,
            email: this.userForm.email,
          })
          .subscribe((newUser: User) => {
            this.userAdded.emit(newUser); // Emitujemy nowego użytkownika
            this.resetForm();
          });
      }
    }
  }

  onCancel() {
    this.resetForm();
    this.cancelled.emit(); // Informujemy o zamknięciu bez zapisu
  }
}
