import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification/notification.service';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  addForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  createUser(): void {
    if (this.addForm.valid) {
      this.apiService.createUser(this.addForm.value as User).subscribe({
        next: () => {
          this.notificationService.showMessage('Aluno criado com sucesso!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.handleBackendErrors(error);
        }
      });
    } else {
      this.displayValidationErrors();
    }
  }

  handleBackendErrors(error: any): void {
    if (error.status === 422 && error.error.errors) {
      this.errorMessage = Object.values(error.error.errors).join(' ');
    } else {
      this.errorMessage = 'Ocorreu um erro ao criar o aluno. Tente novamente mais tarde.';
    }
  }

  displayValidationErrors(): void {
    for (const control in this.addForm.controls) {
      if (this.addForm.controls.hasOwnProperty(control)) {
        this.addForm.controls[control].markAsTouched();
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
