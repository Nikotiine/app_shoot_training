import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

import { DatePipe } from '@angular/common';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { Router } from '@angular/router';
import { AdminDashboardDataInformation } from '../../../core/api/models/admin-dashboard-data-information';

export interface AdminCardViewModel {
  title: string;
  totalEntry: number;
  nameOrFactory: string | undefined;
  firstNameOrModel: string | undefined;
  createdAt: string | undefined;
  routerLink: string;
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
  private readonly router: Router = inject(Router);
  public cards: AdminCardViewModel[] = [];

  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les donnee a afficher sur le dashboard admin
   */
  private loadData(): void {
    this.adminService.getDataForDashboard().subscribe({
      next: (data) => {
        this.createCardViewModel(data);
      },
      error: (err) => {
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  /**
   * Creer les card du dashboard
   * @param data AdminDashboardDataInformation
   */
  private createCardViewModel(data: AdminDashboardDataInformation): void {
    this.cards = [
      {
        title:
          data.totalUsers > 1 ? 'Utilisateurs incrits' : 'Utilisateur incrit',
        totalEntry: data.totalUsers,
        nameOrFactory: data.lastUserEntry.lastName,
        firstNameOrModel: data.lastUserEntry.firstName,
        createdAt: data.lastUserEntry.createdAt,
        routerLink: Routing.ADMIN + '/' + Routing.ADMIN_USERS_LIST
      },
      {
        title:
          data.totalWeapons > 1 ? 'Armes enregistrées' : 'Arme enregistrée',
        totalEntry: data.totalWeapons,
        nameOrFactory: data.lastWeaponEntry.factory.name,
        firstNameOrModel: data.lastWeaponEntry.model,
        createdAt: data.lastWeaponEntry.createdAt,
        routerLink: Routing.ADMIN + '/' + Routing.ADMIN_WEAPONS_LIST
      },
      {
        title:
          data.totalOptics > 1
            ? 'Optiques enregistrées'
            : 'Optique enregistrée',
        totalEntry: data.totalOptics,
        nameOrFactory: data.lastOpticEntry.factory.name,
        firstNameOrModel: data.lastOpticEntry.name,
        createdAt: data.lastOpticEntry.createdAt,
        routerLink: Routing.ADMIN + '/' + Routing.ADMIN_OPTICS_LIST
      },
      {
        title: 'Munitions enregistrées',
        totalEntry: data.totalAmmunition ?? 0,
        nameOrFactory: data.lastAmmunitionEntry?.factory.name,
        firstNameOrModel: data.lastAmmunitionEntry?.name,
        createdAt: data.lastAmmunitionEntry?.createdAt,
        routerLink: Routing.ADMIN + '/' + Routing.ADMIN_AMMUNITION_LIST
      }
    ];
  }

  /**
   * Permet de naviquer entre les differente card
   * @param url string
   */
  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
