import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../notification/notification.service';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isAddingUser: boolean = false;
  editForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  deleteUser(id: number): void {
    this.apiService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.notificationService.showMessage('Aluno excluído com sucesso!');
    });
  }

  editUser(user: User): void {
    this.router.navigate(['/edit-student', user.id]);
  }

  updateUser(): void {
    if (this.editForm.valid && this.selectedUser) {
      this.apiService.updateUser(this.selectedUser.id, this.editForm.value).subscribe(() => {
        this.resetForm();
        this.loadUsers();
        this.notificationService.showMessage('Aluno atualizado com sucesso!');
      });
    }
  }

  addUser(): void {
    this.router.navigate(['/add-student']);
  }

  createUser(): void {
    if (this.editForm.valid) {
      this.apiService.createUser(this.editForm.value).subscribe(() => {
        this.isAddingUser = false;
        this.loadUsers();
        this.notificationService.showMessage('Aluno criado com sucesso!');
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.selectedUser = null;
    this.isAddingUser = false;
    this.editForm.reset();
  }

  navigateToChat(): void {
    this.router.navigate(['/chat']);
  }
}
