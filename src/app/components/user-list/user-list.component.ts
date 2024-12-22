import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service'; // Importujemy ApiService
import { UserFormComponent } from '../user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { User } from 'app/models/user.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { UserRowComponent } from '../user-row/user-row.component';

@Component({
  selector: 'app-user-list',
  imports: [
    UserFormComponent,
    DeleteModalComponent,
    CommonModule,
    FontAwesomeModule,
    UserRowComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  faUserGroup = faUserGroup;
  faPlus = faPlus;
  users: User[] = []; // Tablica na przechowywanie danych użytkowników
  showModal: boolean = false; // Flaga do wyświetlania formularza
  userToEdit: User | null = null; // zmienna przechowująca użytkownika do edycji
  userToDelete: User | null = null; // zmienna przechowująca użytkownika do usunięcia

  constructor(private apiService: ApiService) {} // Wstrzykujemy ApiService

  ngOnInit() {
    this.loadUsers(); // Ładujemy użytkowników przy starcie
  }

  // Pobranie listy użytkowników
  loadUsers() {
    this.apiService.getUsers().subscribe((response: any) => {
      this.users = response.data;
    });
  }

  // ===== Modal z formularzem dodawania/edytowania użytkownika =====

  //Pokazanie modalu edytowania użytkownika
  onShowEditModal(user: User) {
    this.userToEdit = { ...user };
    this.showModal = true;
  }

  onHideEditModal() {
    this.showModal = false;
  }

  // Obsługa dodania użytkownika
  onUserAdded(newUser: User) {
    this.users.push(newUser); // Dodaj użytkownika do lokalnej listy
    this.showModal = false; // Zamykamy modal
  }

  // Obsługa aktualizacji użytkownika
  onUserUpdated(updatedUser: User) {
    const index = this.users.findIndex(
      (user) => user.id === this.userToEdit?.id
    );

    if (index > -1) {
      this.users[index] = updatedUser;
    }
    this.userToEdit = null;
    this.showModal = false;
  }

  // ===== Modal usuwania użytkownika =====

  // Pokazanie modalu usuwania
  onShowDeleteModal(user: User) {
    this.userToDelete = user;
  }

  // Usunięcie użytkownika
  onUserDeleted() {
    if (this.userToDelete) {
      this.users = this.users.filter(
        (user) => user.id !== this.userToDelete?.id
      ); // Usuwamy użytkownika z listy
      this.userToDelete = null; // Resetujemy zmienną i zamykamy modal
    }
  }

  // Anulowanie usunięcia
  onHideDeleteModal() {
    this.userToDelete = null;
  }
}
