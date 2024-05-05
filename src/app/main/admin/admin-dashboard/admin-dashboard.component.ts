import { Component, inject, OnInit } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

import { DatePipe } from '@angular/common';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { Router } from '@angular/router';
import { AdminService } from '../../../core/app/services/admin.service';
import { forkJoin } from 'rxjs';
import { TotalCountDto } from '../../../core/api/models/total-count-dto';
import { LastEntriesDto } from '../../../core/api/models/last-entries-dto';

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
    forkJoin([
      this.adminService.getTotalCount(),
      this.adminService.getLastEntries()
    ]).subscribe({
      next: (data) => {
        this.createCardViewModel(data[0], data[1]);
      },
      error: (err) => {
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  /**
   * Creer les card du dashboard

   */
  private createCardViewModel(
    totals: TotalCountDto,
    entries: LastEntriesDto
  ): void {
    this.cards = [
      {
        title:
          totals.totalUsers > 1 ? 'Utilisateurs incrits' : 'Utilisateur incrit',
        totalEntry: totals.totalUsers,
        nameOrFactory: entries.lastUser.lastName,
        firstNameOrModel: entries.lastUser.firstName,
        createdAt: entries.lastUser.createdAt,
        routerLink: Routing.ADMIN + '/' + Routing.ADMIN_USERS_LIST
      },
      {
        title:
          totals.totalWeapons > 1 ? 'Armes enregistrées' : 'Arme enregistrée',
        totalEntry: totals.totalWeapons,
        nameOrFactory: entries.lastWeapon.factory.name,
        firstNameOrModel: entries.lastWeapon.model,
        createdAt: entries.lastWeapon.createdAt,
        routerLink: Routing.ADMIN + '/' + Routing.ADMIN_WEAPONS_LIST
      },
      {
        title:
          totals.totalOptics > 1
            ? 'Optiques enregistrées'
            : 'Optique enregistrée',
        totalEntry: totals.totalOptics,
        nameOrFactory: entries.lastOptics.factory.name,
        firstNameOrModel: entries.lastOptics.name,
        createdAt: entries.lastOptics.createdAt,
        routerLink: Routing.ADMIN + '/' + Routing.ADMIN_OPTICS_LIST
      },
      {
        title:
          totals.totalAmmunition > 1
            ? 'Munitions enregistrées'
            : 'Munition enregistrée',
        totalEntry: totals.totalAmmunition,
        nameOrFactory: entries.lastAmmunition.factory.name,
        firstNameOrModel: entries.lastAmmunition.name,
        createdAt: entries.lastAmmunition.createdAt,
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
