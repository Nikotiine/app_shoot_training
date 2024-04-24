import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../../../core/api/services';
import { ResponseMessage } from '../../../core/api/models/response-message';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RefreshCodeRequest } from '../../../core/api/models/refresh-code-request';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { ActivationCodeDto } from '../../../core/api/models/activation-code-dto';

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, ReactiveFormsModule],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.scss'
})
export class AccountActivationComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private registrationService = inject(RegistrationService);
  public message: ResponseMessage = {
    code: 0,
    message: ''
  };
  public form: FormGroup;
  private _email: string = '';
  //TODO supprimer le constructeur pour des inject
  constructor(
    private readonly fb: FormBuilder,
    private readonly customMessageService: CustomMessageService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      code: [
        null,
        [Validators.required, Validators.min(100000), Validators.max(999999)]
      ]
    });
  }
  ngOnInit(): void {
    this._email = this.activatedRoute.snapshot.params['email'];
  }

  public getNewCode(): void {
    const refreshCodeRequest: RefreshCodeRequest = {
      email: this._email
    };
    this.registrationService
      .refreshCode({ body: refreshCodeRequest })
      .subscribe({
        next: (res) => {
          this.message = res;
          this.customMessageService.successMessage('Compte', res.message);
        },
        error: (err) => {
          this.customMessageService.errorMessage('Compte', err.error.message);
        }
      });
  }

  public submitCode(): void {
    const code: ActivationCodeDto = {
      code: this.form.controls['code'].value,
      email: this._email
    };
    this.registrationService
      .codeValidation({
        body: code
      })
      .subscribe({
        next: (res) => {
          this.message = res;
          if (res.code === 2) {
            this.customMessageService.successMessage('Compte', res.message);
            this.router.navigate([Routing.LOGIN]);
          }
        },
        error: (err) => {
          this.message = err.error;
          this.customMessageService.errorMessage('Compte', err.error.message);
          this.form.controls['code'].setValue(null);
        }
      });
  }
}
