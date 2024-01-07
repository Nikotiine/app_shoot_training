import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { ValidationCodeDto } from '../../../core/api/models/validation-code-dto';

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
  public message: ResponseMessage = {};
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      code: [
        null,
        [Validators.required, Validators.min(100000), Validators.max(999999)]
      ]
    });
  }
  ngOnInit(): void {
    const email = this.activatedRoute.snapshot.params['email'];

    this.registrationService.emailVerification({ email }).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public getNewCode(): void {
    console.log('new');
  }

  public submitCode(): void {
    const code: ValidationCodeDto = {
      code: this.form.controls['code'].value
    };
    console.log(code);
    this.registrationService
      .codeValidation({
        body: code
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
