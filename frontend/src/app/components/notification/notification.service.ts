import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$: Observable<string | null> = this.messageSubject.asObservable();

  /**
   * Show a notification message for a specified duration.
   * @param message - The notification message to display.
   * @param duration - The duration in milliseconds to display the message.
   */
  showMessage(message: string, duration: number = 3000): void {
    this.messageSubject.next(message);
    setTimeout(() => this.clearMessage(), duration);
  }

  private clearMessage(): void {
    this.messageSubject.next(null);
  }
}
