import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { AmmunitionDto } from '../../../core/api/models/ammunition-dto';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';

@Component({
  selector: 'app-admin-ammunition-list',
  standalone: true,
  imports: [ButtonModule, DatePipe, SharedModule, TableModule],
  templateUrl: './admin-ammunition-list.component.html',
  styleUrl: './admin-ammunition-list.component.scss'
})
export class AdminAmmunitionListComponent implements OnInit {
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);

  public ammunition: AmmunitionDto[] = [];
  ngOnInit(): void {
    this.loadAmmunition();
  }

  private loadAmmunition(): void {
    this.ammunitionService.getAllAmmunition().subscribe({
      next: (ammunition) => {
        console.log(ammunition);
        this.ammunition = ammunition;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
