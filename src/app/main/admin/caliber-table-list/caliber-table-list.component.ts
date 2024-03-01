import { Component, inject, OnInit } from '@angular/core';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-caliber-table-list',
  standalone: true,
  imports: [ButtonModule, SharedModule, TableModule],
  templateUrl: './caliber-table-list.component.html',
  styleUrl: './caliber-table-list.component.scss'
})
export class CaliberTableListComponent implements OnInit {
  private readonly caliberService: CaliberService = inject(CaliberService);
  public calibers: CaliberDto[] = [];
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.caliberService.getAllCalibers().subscribe({
      next: (calibers) => {
        this.calibers = calibers;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
