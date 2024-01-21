import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserWeaponSetupAddComponent } from '../user-weapon-setup-add/user-weapon-setup-add.component';

@Component({
  selector: 'app-user-weapon-setup-list',
  standalone: true,
  imports: [ButtonModule, DialogModule, UserWeaponSetupAddComponent],
  templateUrl: './user-weapon-setup-list.component.html',
  styleUrl: './user-weapon-setup-list.component.scss'
})
export class UserWeaponSetupListComponent {
  public visible: boolean = false;
  addSetup() {
    console.log('add');
    this.visible = !this.visible;
  }
}
