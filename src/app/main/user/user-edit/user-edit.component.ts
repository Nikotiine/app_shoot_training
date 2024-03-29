import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { UserService } from '../../../core/api/services/user.service';
import { UserEditDto } from '../../../core/api/models/user-edit-dto';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  public isChangePassword: boolean = false;
  @Input() set profile(profile: UserProfileDto) {
    this._shooterProfile = profile;
    this.form.controls['firstName'].setValue(profile.firstName);
    this.form.controls['lastName'].setValue(profile.lastName);
  }
  get profile(): UserProfileDto {
    return this._shooterProfile;
  }

  @Output() profileChange: EventEmitter<UserProfileDto> =
    new EventEmitter<UserProfileDto>();

  private _shooterProfile!: UserProfileDto;
  public form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
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
    const editProfile: UserEditDto = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.profile.email,
      createdAt: this.profile.createdAt,
      id: this.profile.id,
      active: this.profile.active
    };
    const oldPassword = this.form.controls['oldPassword'].value;
    if (oldPassword) {
      const changePassword = this.isPasswordMatch();
      if (changePassword) {
        editProfile.oldPassword = oldPassword;
        editProfile.password = this.form.controls['password'].value;
      }
    }

    this.userService
      .editProfile({
        body: editProfile
      })
      .subscribe({
        next: (res) => {
          this._shooterProfile = res;
          this.customMessageService.successMessage(
            'Compte',
            'Profile modifié avec succes'
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
