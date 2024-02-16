import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private readonly adminService: AdminService = inject(AdminService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.adminService.getDataForDashboard().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
