import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRoleEnum } from '../../../core/app/enum/UserRole.enum';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../core/app/services/user.service';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { RouterLink } from '@angular/router';
import { Routing } from '../../../core/app/enum/Routing.enum';
import { CustomConfirmationService } from '../../../core/app/services/custom-confirmation.service';

@Component({
  selector: 'app-admin-users-list',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    DatePipe,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './admin-users-list.component.html',
  styleUrl: './admin-users-list.component.scss'
})
export class AdminUsersListComponent implements OnInit {
  // Private field
  private readonly adminService: AdminService = inject(AdminService);
  private readonly appUserService: UserService = inject(UserService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly customConfirmationService: CustomConfirmationService =
    inject(CustomConfirmationService);
  private readonly _currentPageMessageHeader: string =
    'Administration des utilisateurs';
  private _selectedUser: UserProfileDto | null = null;
  //public field

  protected readonly Routing = Routing;
  public users: UserProfileDto[] = [];
  public form: FormGroup = inject(FormBuilder).group({
    role: [UserRoleEnum.USER]
  });
  public showChangeRoleForm: boolean = false;
  public roles: UserRoleEnum[] = [UserRoleEnum.USER, UserRoleEnum.ADMIN];

  public ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Charge la liste des utilisateurs depuis la bade de données
   */
  private loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        this.customMessageService.errorMessage(
          this._currentPageMessageHeader,
          err.error.message
        );
      }
    });
  }

  /**
   * Verifie avant de changer le role que l'utilisateur courant n'est pas le meme que l'utilisateur edité
   * Affiche la boite de dialogue si utilisateur courant != utilisateur edité
   * @param id du profil utilisateur
   */
  public changeRole(id: number): void {
    const user = this.getUserById(id);
    if (user.email === this.appUserService.getProfile()?.email) {
      this.customMessageService.warningMessage(
        this._currentPageMessageHeader,
        'Vous ne pouvez pas changer votre propre role'
      );
    } else {
      this.form.controls['role'].setValue(user.role);
      this._selectedUser = user;
      this.showChangeRoleForm = !this.showChangeRoleForm;
    }
  }

  /**
   * Soumission du formulaire pour le changmement de role de l'utilisateur
   */
  public submitChangeRole(): void {
    if (this._selectedUser) {
      this._selectedUser.role = this.form.controls['role'].value;
      this.adminService
        .editUserRole({
          body: this._selectedUser
        })
        .subscribe({
          next: (res) => {
            this.users = res;
            this.showChangeRoleForm = !this.showChangeRoleForm;
            this.customMessageService.successMessage(
              this._currentPageMessageHeader,
              'Role utilisateur modifier'
            );
          },
          error: (err) => {
            this.customMessageService.errorMessage(
              this._currentPageMessageHeader,
              err.error.message
            );
          }
        });
    }
  }

  /**
   * Soumission du formulaire de desactivation du profil
   * @param id
   */
  private disableUser(id: number): void {
    this.adminService
      .disableUser({
        id: id
      })
      .subscribe({
        next: (res) => {
          this.users = res;
          this.customMessageService.successMessage(
            this._currentPageMessageHeader,
            'Utilisateur desactivé'
          );
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this._currentPageMessageHeader,
            err.error.message
          );
        }
      });
  }

  /**
   * Verifie que l'utlisateur courant n'est pas le meme que l'utilisateur qui sera descativé
   * Si diffent affiche une boite de dialogue pour confirmer
   * @param event Event de ConfirmationService
   * @param user UserProfileDto
   */
  public async confirm(event: Event, user: UserProfileDto): Promise<void> {
    if (user.email === this.appUserService.getProfile()?.email) {
      this.customMessageService.errorMessage(
        this._currentPageMessageHeader,
        'Vous ne pouvez pas vous desactiver'
      );
    } else {
      const confirmed = await this.customConfirmationService.confirm(
        event,
        'Supprimer cet utilisateur ? ',
        this._currentPageMessageHeader
      );
      if (confirmed) {
        this.disableUser(user.id);
      }
    }
  }

  /**
   * Permet de retrouve l utitisateur selectionner parmis le tableau d'utitisateurs
   * @param id de l'utitisateur
   * return UserProfileDto
   */
  private getUserById(id: number): UserProfileDto {
    return <UserProfileDto>this.users.find((user) => user.id === id);
  }
}
