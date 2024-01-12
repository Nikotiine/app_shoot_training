import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';

import { NewPasswordRequestDto } from '../../../core/api/models/new-password-request-dto';

import { Routing } from '../../../core/app/enum/Routing.enum';
import { ForgotPasswordService } from '../../../core/api/services/forgot-password.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    ButtonModule,
    InputNumberModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private _email: string = '';
  public form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly customMessageService: CustomMessageService,
    private readonly router: Router,
    private readonly forgotPasswordService: ForgotPasswordService
  ) {
    this.form = this.fb.group({
      code: [
        null,
        [Validators.required, Validators.min(100000), Validators.max(999999)]
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this._email = this.activatedRoute.snapshot.params['email'];
  }

  public submit(): void {
    const isPasswordMatch: boolean = this.passwordMatch();
    if (!isPasswordMatch) {
      this.resetForm();
    } else {
      const newPasswordRequest: NewPasswordRequestDto = {
        email: this._email,
        code: this.form.controls['code'].value,
        password: this.form.controls['password'].value
      };
      this.forgotPasswordService
        .saveNewPassword({
          body: newPasswordRequest
        })
        .subscribe({
          next: (res) => {
            this.customMessageService.successMessage('Compte', res.message);
            this.router.navigate([Routing.LOGIN]);
          },
          error: (err) => {
            this.customMessageService.errorMessage('Compte', err.error.message);
            this.form.controls['code'].setValue(null);
          }
        });
    }
  }

  /**
   * Verifie que les mots de passe correpondent
   */
  private passwordMatch(): boolean {
    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;
    return password === confirmPassword;
  }

  /**
   * Remet a 0 le formulaire
   * @private
   */
  private resetForm(): void {
    this.customMessageService.errorMessage(
      'Controle',
      'Les mots de passe ne correpondent pas '
    );
    this.form.controls['password'].setValue('');
    this.form.controls['confirmPassword'].setValue('');
  }
}
