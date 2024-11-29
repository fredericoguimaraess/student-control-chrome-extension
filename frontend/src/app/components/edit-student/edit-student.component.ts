import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification/notification.service';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  editForm: FormGroup;
  userId!: number;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.userId = this.getUserIdFromRoute();
    this.loadUser();
  }

  private getUserIdFromRoute(): number {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? +id : 0;
  }

  private loadUser(): void {
    this.apiService.getUser(this.userId).subscribe({
      next: (user: User) => this.editForm.patchValue(user),
      error: (error) => this.handleBackendErrors(error)
    });
  }

  updateUser(): void {
    if (this.editForm.valid) {
      this.apiService.updateUser(this.userId, this.editForm.value as User).subscribe({
        next: () => {
          this.notificationService.showMessage('Aluno atualizado com sucesso!');
          this.router.navigate(['/']);
        },
        error: (error) => this.handleBackendErrors(error)
      });
    } else {
      this.displayValidationErrors();
    }
  }

  private handleBackendErrors(error: any): void {
    if (error.status === 422 && error.error.errors) {
      this.errorMessage = Object.values(error.error.errors).join(' ');
    } else {
      this.errorMessage = 'Ocorreu um erro ao atualizar o aluno. Tente novamente mais tarde.';
    }
  }

  private displayValidationErrors(): void {
    for (const control in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(control)) {
        this.editForm.controls[control].markAsTouched();
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
