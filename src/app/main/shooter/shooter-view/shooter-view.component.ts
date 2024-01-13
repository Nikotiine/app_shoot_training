import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/app/services/user.service';
import { ShooterProfileDto } from '../../../core/api/models/shooter-profile-dto';

@Component({
  selector: 'app-shooter-view',
  standalone: true,
  imports: [],
  templateUrl: './shooter-view.component.html',
  styleUrl: './shooter-view.component.scss'
})
export class ShooterViewComponent implements OnInit {
  private userService: UserService = inject(UserService);
  public shooterProfile!: ShooterProfileDto;
  ngOnInit(): void {
    this.shooterProfile = this.userService.getProfile();
    console.log(this.shooterProfile);
  }
}
