import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RefreshCodeRequest } from '../../../core/api/models/refresh-code-request';

import { Router } from '@angular/router';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { ForgotPasswordService } from '../../../core/api/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  public form: FormGroup;
  //TODO supprimer le constructeur pour des inject
  constructor(
    private readonly fb: FormBuilder,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly router: Router,
    private readonly customMessageService: CustomMessageService
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required]]
    });
  }

  public submit(): void {
    const email = this.form.controls['email'].value;
    const request: RefreshCodeRequest = {
      email: email
    };
    this.forgotPasswordService
      .requestNewPassword({
        body: request
      })
      .subscribe({
        next: (res) => {
          if (res.code === 4) {
            this.customMessageService.successMessage('Compte', res.message);
            this.router.navigate([Routing.NEW_PASSWORD + email + '/activate']);
          }
        },
        error: (err) => {
          this.customMessageService.errorMessage('Compte', err.error.message);
          this.form.controls['email'].setValue(null);
        }
      });
  }
}
