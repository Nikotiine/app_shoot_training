import { Component, inject, OnInit } from '@angular/core';
import { CustomUserService } from '../../../core/app/services/custom-user.service';

import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [DatePipe, ButtonModule, UserEditComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent implements OnInit {
  private userService: CustomUserService = inject(CustomUserService);
  public shooterProfile!: UserProfileDto;
  public isEdit: boolean = false;
  ngOnInit(): void {
    const user = this.userService.getProfile();
    if (user) {
      this.shooterProfile = user;
    }
  }

  public editProfile(): void {
    this.isEdit = !this.isEdit;
  }

  profileChange($event: UserProfileDto) {
    this.shooterProfile = $event;
    this.isEdit = false;
  }
}
