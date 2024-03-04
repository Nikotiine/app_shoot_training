import { Component, inject, Input } from '@angular/core';
import { FactoryType } from '../../../core/app/enum/FactoryType.enum';

import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';

import { FactoryDto } from '../../../core/api/models/factory-dto';
import { FactoryService } from '../../../core/api/services/factory.service';
import { FactoryAddComponent } from '../factory-add/factory-add.component';

@Component({
  selector: 'app-factory-table-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    SharedModule,
    TableModule,
    FactoryAddComponent
  ],
  templateUrl: './factory-table-list.component.html',
  styleUrl: './factory-table-list.component.scss'
})
export class FactoryTableListComponent {
  @Input() set factoryType(factory: FactoryType) {
    this._factory = factory;
    this.loadFactory(factory);
  }

  get factory() {
    return this._factory;
  }

  private _factory!: FactoryType;
  public factories: FactoryDto[] = [];
  public newFactoryForm: boolean = false;
  private readonly factoryService: FactoryService = inject(FactoryService);

  private loadFactory(type: FactoryType): void {
    this.factoryService
      .getAllFactoryByType({
        type: type
      })
      .subscribe({
        next: (factories) => {
          this.factories = factories;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  addFactory() {
    this.newFactoryForm = !this.newFactoryForm;
  }

  newFactory(event: FactoryDto): void {
    this.factories.push(event);
    this.newFactoryForm = false;
  }
}
