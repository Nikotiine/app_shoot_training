import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { OpticsService } from '../../../core/api/services/optics.service';

@Component({
  selector: 'app-admin-optics-list',
  standalone: true,
  imports: [],
  templateUrl: './admin-optics-list.component.html',
  styleUrl: './admin-optics-list.component.scss'
})
export class AdminOpticsListComponent implements OnInit {
  private readonly opticsService: OpticsService = inject(OpticsService);

  public ngOnInit(): void {
    this.loadOptics();
  }

  private loadOptics(): void {
    this.opticsService.getAllOptics().subscribe({
      next: (optics) => {
        console.log(optics);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
