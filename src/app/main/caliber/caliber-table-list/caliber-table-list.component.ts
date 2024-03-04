import { Component, inject, OnInit } from '@angular/core';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CaliberAddComponent } from '../caliber-add/caliber-add.component';

@Component({
  selector: 'app-caliber-table-list',
  standalone: true,
  imports: [ButtonModule, SharedModule, TableModule, CaliberAddComponent],
  templateUrl: './caliber-table-list.component.html',
  styleUrl: './caliber-table-list.component.scss'
})
export class CaliberTableListComponent implements OnInit {
  private readonly caliberService: CaliberService = inject(CaliberService);
  public calibers: CaliberDto[] = [];
  public visible: boolean = false;
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
  public add(): void {
    this.visible = !this.visible;
  }

  public newCaliber(newCaliber: CaliberDto): void {
    this.visible = false;
    this.calibers.push(newCaliber);
  }
}
