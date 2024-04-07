import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { Routing } from '../../core/app/enum/Routing.enum';
import { SecurityService } from '../../core/app/services/security.service';
import { CustomUserService } from '../../core/app/services/custom-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MenubarModule, InputTextModule, ButtonModule, MenuModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  // Private field
  private readonly securityService: SecurityService = inject(SecurityService);
  private readonly userProfileService: CustomUserService =
    inject(CustomUserService);
  private readonly router: Router = inject(Router);
  protected readonly Routing = Routing;

  // Public field
  public navbarConnected: MenuItem[] = [];
  public navbarVisitor: MenuItem[] = [];
  public isLogged: Signal<boolean> = computed(() => {
    return this.securityService.authenticate();
  });
  public isAdmin: Signal<boolean> = computed(() => {
    return this.userProfileService.isAdmin();
  });

  public ngOnInit(): void {
    this.navbarVisitor = this.createNavbarVisitor();
    this.navbarConnected = this.createNavbarConnected();
  }

  public logout(): void {
    this.securityService.logout();
    this.router.navigate([Routing.HOME]);
  }

  private createNavbarConnected(): MenuItem[] {
    return [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: Routing.HOME
      },
      {
        label: 'Mon compte',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Mes info',
            icon: 'pi pi-fw pi-info',
            routerLink: Routing.USER + '/' + Routing.USER_PROFILE
          },
          {
            label: 'Mes armes',
            icon: 'pi pi-fw pi-list',
            routerLink: Routing.USER + '/' + Routing.USER_WEAPON_SETUP_LIST
          }
        ]
      },
      {
        label: 'Calculateur balistique',
        icon: 'pi pi-fw pi-sliders-h',
        items: [
          {
            label: 'Joules',
            icon: 'pi pi-fw pi-sort-alt',
            routerLink: Routing.JOULE_CALCULATOR
          },
          {
            label: 'Reglages de lunette',
            icon: 'pi pi-fw pi-wrench'
          }
        ]
      },
      {
        label: 'Entrainement',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Nouvelle session',
            icon: 'pi pi-fw pi-pencil',
            routerLink: Routing.TRAINING + '/' + Routing.TRAINING_SESSION_FORM
          },
          {
            label: 'Session passé',
            icon: 'pi pi-fw pi-history'
          },
          {
            label: 'Statistiques',
            icon: 'pi pi-fw pi-chart-line'
          }
        ]
      }
    ];
  }

  private createNavbarVisitor(): MenuItem[] {
    return [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: Routing.HOME
      },
      {
        label: 'Calculateur balistique',
        icon: 'pi pi-fw pi-sliders-h',
        items: [
          {
            label: 'Joules',
            icon: 'pi pi-fw pi-sort-alt',
            routerLink: Routing.JOULE_CALCULATOR
          },
          {
            label: 'Reglages de lunette',
            icon: 'pi pi-fw pi-wrench'
          }
        ]
      },
      {
        label: 'Menu Hors co',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archive',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      },
      {
        label: 'Menu Hors co',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
  }
}
