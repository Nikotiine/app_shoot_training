import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/app/services/user.service';
import { ShooterProfileDto } from '../../../core/api/models/shooter-profile-dto';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ShooterEditComponent } from '../shooter-edit/shooter-edit.component';

@Component({
  selector: 'app-shooter-view',
  standalone: true,
  imports: [DatePipe, ButtonModule, ShooterEditComponent],
  templateUrl: './shooter-view.component.html',
  styleUrl: './shooter-view.component.scss'
})
export class ShooterViewComponent implements OnInit {
  private userService: UserService = inject(UserService);
  public shooterProfile!: ShooterProfileDto;
  public isEdit: boolean = false;
  ngOnInit(): void {
    this.shooterProfile = this.userService.getProfile();
  }

  public editProfile(): void {
    this.isEdit = !this.isEdit;
  }
}
