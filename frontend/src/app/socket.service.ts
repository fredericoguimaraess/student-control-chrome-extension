import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface ChatMessage {
  sender: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: Socket;
  private messageSubject = new Subject<ChatMessage>();
  private imageSubject = new Subject<Blob>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket = io('http://localhost:3000');
      this.listenForMessages();
      this.listenForImages();
    }
  }

  sendMessage(message: ChatMessage): void {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit('message', message);
    }
  }

  sendImage(file: File): void {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit('upload', file, (status: any) => {
        console.log(status);
      });
    }
  }

  getMessage(): Observable<ChatMessage> {
    return this.messageSubject.asObservable();
  }

  getImage(): Observable<Blob> {
    return this.imageSubject.asObservable();
  }

  private listenForMessages(): void {
    this.socket.on('message', (data: ChatMessage) => {
      this.messageSubject.next(data);
    });
  }

  private listenForImages(): void {
    this.socket.on('upload', (data: Blob) => {
      this.imageSubject.next(data);
    });
  }
}
