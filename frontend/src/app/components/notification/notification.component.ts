import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message$ | async as message" class="notification">
      {{ message }}
    </div>
  `,
  styles: [`
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: green;
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 1000;
    }
  `]
})
export class NotificationComponent {
  message$: Observable<string | null>;

  constructor(private notificationService: NotificationService) {
    this.message$ = this.notificationService.message$;
  }
}
