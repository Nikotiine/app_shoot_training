import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { NavigationComponent } from '../navigation/navigation.component';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../core/app/services/user.service';

import { UserProfileDto } from '../../core/api/models/user-profile-dto';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarModule,
    NavigationComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);
  ngOnInit(): void {
    const userProfile: UserProfileDto = this.activatedRoute.snapshot.data[0];
    if (userProfile) {
      this.userService.setProfile(userProfile);
    }
  }
}
