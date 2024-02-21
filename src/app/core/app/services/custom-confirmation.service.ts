import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomConfirmationService {
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
}
