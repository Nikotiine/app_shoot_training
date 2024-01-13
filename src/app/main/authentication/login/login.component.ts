import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Routing } from '../../../core/app/enum/Routing.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../../../core/api/services/authentication.service';
import { CredentialsDto } from '../../../core/api/models/credentials-dto';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { mergeMap } from 'rxjs';
import { SecurityService } from '../../../core/app/services/security.service';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected readonly Routing = Routing;

  public form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly securityService: SecurityService,
    private readonly customMessageService: CustomMessageService
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  public submit(): void {
    const credentials: CredentialsDto = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    };
    this.securityService.removeToken();
    this.authenticationService
      .login({
        body: credentials
      })
      .pipe(
        mergeMap((token) => {
          this.securityService.saveToken(token);
          return this.authenticationService.me();
        })
      )
      .subscribe({
        next: (profile) => {
          this.customMessageService.successMessage(
            'Connexion',
            `Bonjour ${profile.firstName}`
          );
          this.securityService.setAuthentication(profile);
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            'Authentication',
            err.error.message
          );
          this.form.controls['email'].setValue(null);
          this.form.controls['password'].setValue(null);
        }
      });
  }
}
