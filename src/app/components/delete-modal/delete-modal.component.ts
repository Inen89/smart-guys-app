import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  @Input() userToDelete: User | null = null; // Przekazany użytkownik do usunięcia
  @Output() deleted = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(private apiService: ApiService) {}

  onConfirm() {
    if (this.userToDelete) {
      this.apiService.deleteUser(this.userToDelete.id).subscribe(() => {
        this.deleted.emit(); // Emitujemy potwierdzenie usunięcia
      });
    }
  }

  onCancel() {
    this.cancelled.emit();
  }
}
