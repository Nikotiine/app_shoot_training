import { inject, Injectable, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomConfirmationService {
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);

  public isConfirm = signal(false);
  public confirm(event: Event, message: string, header: string): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.isConfirm.set(true);
      },
      reject: () => {
        this.isConfirm.set(false);
      }
    });
  }
}
