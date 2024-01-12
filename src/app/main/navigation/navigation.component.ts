import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { Routing } from '../../core/app/enum/Routing.enum';
import { SecurityService } from '../../core/app/services/security.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MenubarModule, InputTextModule, ButtonModule, MenuModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  public navbarConnected: MenuItem[] = [];
  public navbarVisitor: MenuItem[] = [];

  protected readonly Routing = Routing;

  private securityService: SecurityService = inject(SecurityService);

  public isLogged: Signal<boolean> = computed(() => {
    return this.securityService.authenticate();
  });

  public ngOnInit(): void {
    this.navbarConnected = this.createNavbarConnected();
    this.navbarVisitor = this.createNavbarVisitor();
  }

  public logout(): void {
    this.securityService.logout();
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
            icon: 'pi pi-fw pi-align-left',
            routerLink: Routing.SHOOTER_PROFILE
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
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
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
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
        label: 'Menu Hors co',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
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
