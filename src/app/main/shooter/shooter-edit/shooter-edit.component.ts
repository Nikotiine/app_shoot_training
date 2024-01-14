import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShooterProfileDto } from '../../../core/api/models/shooter-profile-dto';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ShooterEditDto } from '../../../core/api/models/shooter-edit-dto';
import { ShooterService } from '../../../core/api/services/shooter.service';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

@Component({
  selector: 'app-shooter-edit',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './shooter-edit.component.html',
  styleUrl: './shooter-edit.component.scss'
})
export class ShooterEditComponent {
  public isChangePassword: boolean = false;
  @Input() set profile(profile: ShooterProfileDto) {
    this._shooterProfile = profile;
    this.form.controls['firstName'].setValue(profile.firstName);
    this.form.controls['lastName'].setValue(profile.lastName);
  }
  get profile(): ShooterProfileDto {
    return this._shooterProfile;
  }

  @Output() profileChange: EventEmitter<ShooterProfileDto> =
    new EventEmitter<ShooterProfileDto>();

  private _shooterProfile!: ShooterProfileDto;
  public form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly shooterService: ShooterService,
    private readonly customMessageService: CustomMessageService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      oldPassword: [null],
      password: [null],
      confirmPassword: [null]
    });
  }

  public submit(): void {
    const editProfile: ShooterEditDto = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.profile.email
    };
    const oldPassword = this.form.controls['oldPassword'].value;
    if (oldPassword) {
      const changePassword = this.isPasswordMatch();
      if (changePassword) {
        editProfile.oldPassword = oldPassword;
        editProfile.password = this.form.controls['password'].value;
      }
    }

    this.shooterService
      .edit({
        body: editProfile
      })
      .subscribe({
        next: (res) => {
          this._shooterProfile = res;
          this.customMessageService.successMessage(
            'Compte',
            'Profile modifié avcec succes'
          );
          this.profileChange.emit(res);
        },
        error: (err) => {
          this.form.controls['oldPassword'].setValue(null);
          this.customMessageService.errorMessage('Compte', err.error.message);
        }
      });
  }

  private isPasswordMatch(): boolean {
    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;
    return password === confirmPassword;
  }

  public showFormForNewPassword(): void {
    this.isChangePassword = !this.isChangePassword;
  }
}
