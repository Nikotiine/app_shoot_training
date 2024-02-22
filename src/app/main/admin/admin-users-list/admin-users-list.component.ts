import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRoleEnum } from '../../../core/app/enum/UserRole.enum';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AppUserService } from '../../../core/app/services/app-user.service';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';

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
    ReactiveFormsModule
  ],
  templateUrl: './admin-users-list.component.html',
  styleUrl: './admin-users-list.component.scss'
})
export class AdminUsersListComponent implements OnInit {
  private readonly adminService: AdminService = inject(AdminService);
  private readonly appUserService: AppUserService = inject(AppUserService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);

  private selectedUser: UserProfileDto | null = null;
  public users: UserProfileDto[] = [];
  public form: FormGroup;
  public visible: boolean = false;
  public roles: UserRoleEnum[] = [UserRoleEnum.USER, UserRoleEnum.ADMIN];
  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      role: [UserRoleEnum.USER]
    });
  }
  public ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        this.customMessageService.errorMessage('Admin', err.error.message);
      }
    });
  }

  public changeRole(id: number): void {
    const user = this.getUserById(id);
    if (user.email === this.appUserService.getProfile().email) {
      this.customMessageService.errorMessage(
        'Admin',
        'Vous ne pouvez pas changer votre propre role'
      );
    } else {
      this.form.controls['role'].setValue(user.role);
      this.selectedUser = user;
      this.visible = !this.visible;
    }
  }

  public submitChangeRole(): void {
    if (this.selectedUser) {
      this.selectedUser.role = this.form.controls['role'].value;
      this.adminService
        .editUserRole({
          body: this.selectedUser
        })
        .subscribe({
          next: (res) => {
            this.users = res;
            this.visible = !this.visible;
            this.customMessageService.successMessage(
              'Admin',
              'Role utilisateur modifier'
            );
          },
          error: (err) => {
            this.customMessageService.errorMessage('Admin', err.error.message);
          }
        });
    }
  }

  private disableUser(user: UserProfileDto): void {
    user.active = false;
    this.adminService
      .disableUser({
        body: user
      })
      .subscribe({
        next: (res) => {
          this.users = res;
          this.customMessageService.successMessage(
            'Admin',
            'Utilisateur desactivé'
          );
        },
        error: (err) => {
          this.customMessageService.errorMessage('Admin', err.error.message);
        }
      });
  }

  public confirm(event: Event, id: number): void {
    const user = this.getUserById(id);
    if (user.email === this.appUserService.getProfile().email) {
      this.customMessageService.errorMessage(
        'Admin',
        'Vous ne pouvez pas vous desactiver'
      );
    } else {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Supprimer ce profil ?',
        header: 'Administration',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          this.disableUser(user);
        }
      });
    }
  }
  private getUserById(id: number): UserProfileDto {
    return <UserProfileDto>this.users.find((user) => user.id === id);
  }
}
