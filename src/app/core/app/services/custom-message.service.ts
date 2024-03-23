import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {
  private messageService: MessageService = inject(MessageService);

  public successMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail
    });
  }

  public errorMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail
    });
  }

  public warningMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: detail
    });
  }
}
