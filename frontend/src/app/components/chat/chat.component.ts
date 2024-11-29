import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SocketService } from '../../socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ChatMessage {
  sender: string;
  text: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  user: string;

  constructor(
    private socketService: SocketService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.user = `User${Math.floor(Math.random() * 1000)}`;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.listenForMessages();
      this.listenForImages();
    }
  }

  listenForMessages(): void {
    this.socketService.getMessage().subscribe((message: ChatMessage) => {
      this.messages.push(message);
    });
  }

  listenForImages(): void {
    this.socketService.getImage().subscribe((data: Blob) => {
      const file = new Blob([data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(file);
      this.messages.push({ sender: 'Anexo', text: '', imageUrl });
    });
  }

  captureScreen(): Promise<File> {
    return new Promise((resolve, reject) => {
      this.getDisplayMediaStream().then((stream) => {
        const video = this.createVideoElement(stream);
        video.onloadedmetadata = () => {
          this.captureImageFromVideo(video).then((file) => {
            this.stopStreamTracks(stream);
            if (file) {
              resolve(file);
            } else {
              reject(new Error("Failed to create Blob"));
            }
          });
        };
      }).catch(reject);
    });
  }

  private getDisplayMediaStream(): Promise<MediaStream> {
    return navigator.mediaDevices.getDisplayMedia({ video: true });
  }

  private createVideoElement(stream: MediaStream): HTMLVideoElement {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    return video;
  }

  private captureImageFromVideo(video: HTMLVideoElement): Promise<File | null> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "screenshot.png", { type: "image/png" });
          resolve(file);
        } else {
          resolve(null);
        }
      }, 'image/png');
    });
  }

  private stopStreamTracks(stream: MediaStream): void {
    stream.getTracks().forEach(track => track.stop());
  }


  sendMessage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const message: ChatMessage = { sender: this.user, text: this.newMessage };
      this.socketService.sendMessage(message);
      this.newMessage = '';
    }
  }

  sendImage(): void {
    this.captureScreen().then((file: File) => {
      this.socketService.sendImage(file);
    }).catch(error => {
      console.error('Error capturing screen:', error);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
