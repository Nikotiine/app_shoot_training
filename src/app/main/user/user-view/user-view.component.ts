import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/app/services/user.service';

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
  private userService: UserService = inject(UserService);
  public shooterProfile!: UserProfileDto;
  public isEdit: boolean = false;
  public ngOnInit(): void {
    const user = this.userService.getProfile();
    if (user) {
      this.shooterProfile = user;
    }
  }

  public editProfile(): void {
    this.isEdit = !this.isEdit;
  }

  public profileChange($event: UserProfileDto): void {
    this.shooterProfile = $event;
    this.isEdit = false;
  }
}
