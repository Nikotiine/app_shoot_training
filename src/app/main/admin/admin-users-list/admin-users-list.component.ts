import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-users-list',
  standalone: true,
  imports: [SharedModule, TableModule, DatePipe, ButtonModule],
  templateUrl: './admin-users-list.component.html',
  styleUrl: './admin-users-list.component.scss'
})
export class AdminUsersListComponent implements OnInit {
  private readonly adminService: AdminService = inject(AdminService);

  public users: UserProfileDto[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.users = users;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
