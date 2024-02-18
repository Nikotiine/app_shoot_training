import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { AdminDashboardDto } from '../../../core/api/models/admin-dashboard-dto';
import { DatePipe } from '@angular/common';

export interface AdminCardViewModel {
  title: string;
  totalEntry: number;
  nameOrFactory: string | undefined;
  firstNameOrModel: string | undefined;
  createdAt: string | undefined;
}
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CardModule, ButtonModule, DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private readonly adminService: AdminService = inject(AdminService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  public cards: AdminCardViewModel[] = [];
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.adminService.getDataForDashboard().subscribe({
      next: (data) => {
        console.log(data);
        this.createCardViewModel(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private createCardViewModel(data: AdminDashboardDto) {
    this.cards = [
      {
        title:
          data.totalUsers > 1 ? 'Utilisateurs incrits' : 'Utilisateur incrit',
        totalEntry: data.totalUsers,
        nameOrFactory: data.lastUserEntry.lastName,
        firstNameOrModel: data.lastUserEntry.firstName,
        createdAt: data.lastUserEntry.createdAT
      },
      {
        title: data.totalOptics > 1 ? 'Armes enregistrées' : 'Arme enregistrée',
        totalEntry: data.totalWeapons,
        nameOrFactory: data.lastWeaponEntry.factory.name,
        firstNameOrModel: data.lastWeaponEntry.model,
        createdAt: data.lastWeaponEntry.createdAT
      },
      {
        title:
          data.totalOptics > 1
            ? 'Optiques enregistrées'
            : 'Optique enregistrée',
        totalEntry: data.totalOptics,
        nameOrFactory: data.lastOpticEntry.factory.name,
        firstNameOrModel: data.lastOpticEntry.name,
        createdAt: data.lastOpticEntry.createdAT
      },
      {
        title: 'Munitions enregistrées',
        totalEntry: data.totalAmmunition ?? 0,
        nameOrFactory: data.lastAmmunitionEntry?.factory.name,
        firstNameOrModel: data.lastAmmunitionEntry?.name,
        createdAt: data.lastAmmunitionEntry?.createdAT
      }
    ];
  }
}
