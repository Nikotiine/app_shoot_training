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
import { TokenService } from '../../../core/app/services/token.service';
import { mergeMap } from 'rxjs';
import { ShooterService } from '../../../core/app/services/shooter.service';
import { SecurityService } from '../../../core/app/services/security.service';

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
    private readonly tokenService: TokenService,
    private readonly shooterService: ShooterService,
    private readonly securityService: SecurityService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  public submit(): void {
    const credentials: CredentialsDto = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    };
    this.tokenService.removeToken();
    this.authenticationService
      .login({
        body: credentials
      })
      .pipe(
        mergeMap((token) => {
          this.tokenService.saveToken(token);
          return this.authenticationService.me();
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          //TODO redirect to home
          this.shooterService.setProfile(res);
          this.securityService.isLogged();
        },
        error: (err) => {
          //TODO : afficher le message d'erreur
          console.log(err);
        }
      });
  }
}
