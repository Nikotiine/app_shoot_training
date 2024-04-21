import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomConfirmationService {
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);

  public async confirm(
    event: Event,
    message: string,
    header: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        accept: () => {
          resolve(true); // Résoudre la promesse avec true si l'utilisateur accepte
        },
        reject: () => {
          resolve(false); // Résoudre la promesse avec false si l'utilisateur rejette
        }
      });
    });
  }
}
