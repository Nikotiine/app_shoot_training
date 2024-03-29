import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { AmmunitionService } from '../../../core/api/services/ammunition.service';
import { CaliberService } from '../../../core/api/services/caliber.service';
import { CaliberDto } from '../../../core/api/models/caliber-dto';
import { AmmunitionWeightDto } from '../../../core/api/models/ammunition-weight-dto';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AmmunitionWeight } from '../../../core/app/enum/AmmunitionWeight.enum';

export interface WeightViewModel {
  id: number;
  label: string;
}
@Component({
  selector: 'app-joule',
  standalone: true,
  imports: [
    InputNumberModule,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonModule,
    InputSwitchModule
  ],
  templateUrl: './joule.component.html',
  styleUrl: './joule.component.scss'
})
export class JouleComponent implements OnInit {
  public form: FormGroup;
  public result: string = '';
  public calibers: CaliberDto[] = [];
  public weightsVM: WeightViewModel[] = [];
  private weights: AmmunitionWeightDto[] = [];
  public typeOfWeight: WeightViewModel[] = [
    {
      id: 1,
      label: AmmunitionWeight.GRAM
    },
    {
      id: 2,
      label: AmmunitionWeight.GRAIN
    }
  ];
  public legend: string = 'Parametres pre definis';
  public predefinedParams: boolean = true;
  constructor(
    private fb: FormBuilder,
    private readonly ammunitionService: AmmunitionService,
    private readonly caliberService: CaliberService,
    private readonly customMessageService: CustomMessageService
  ) {
    this.form = this.fb.group({
      weight: [0, [Validators.min(0.1), Validators.required]],
      speed: [0, [Validators.min(1), Validators.required]],
      typeOfWeight: [AmmunitionWeight.GRAM],
      weightsVM: [0],
      caliber: [0]
    });
  }

  /**
   * Calcul la puissance en joules des parametre passe
   */
  public calculate(): void {
    let weight = this.form.controls['weight'].value;
    const typeOfWeight = this.form.controls['typeOfWeight'].value;
    if (typeOfWeight != AmmunitionWeight.GRAM) {
      weight = this.convertGrainToGramme(weight);
    }
    const speed = this.form.controls['speed'].value;
    const joules: number = 0.5 * (weight / 1000) * (speed * speed);
    this.result = joules.toFixed(2);
  }

  ngOnInit(): void {
    this.caliberService.getAllCalibers().subscribe({
      next: (calibers) => {
        this.calibers = calibers;
      },
      error: (err) => {
        this.customMessageService.errorMessage('Calibre', err.error.message);
      }
    });
  }

  /**
   * Charge les poids du calibre choisi
   * @param caliberId
   */
  public caliberSelected(caliberId: number): void {
    this.ammunitionService
      .getWeightByCaliber({
        id: caliberId
      })
      .subscribe({
        next: (weights) => {
          this.createWeightVM(weights);
        },
        error: (err) => {
          this.customMessageService.errorMessage('Calibre', err.error.message);
        }
      });
  }

  /**
   * Set la value du formControlName avec la valeur en gramme du poids predefini choisi
   * @param id id du poids
   */
  public preDefineWeightSelected(id: number): void {
    const weight = <AmmunitionWeightDto>this.weights.find((w) => w.id === id);
    this.form.controls['weight'].setValue(weight.grams);
  }

  /**
   * Swithc entre le mode prefini et le mode perso
   * @param checked la value du switch button
   */
  public switchParam(checked: boolean): void {
    this.predefinedParams = !checked;
    if (checked) {
      this.legend = 'Parametres personalisés';
    } else {
      this.legend = 'Parametres pre definis';
      this.form.controls['typeOfWeight'].setValue(AmmunitionWeight.GRAM);
    }
  }

  /**
   * Creer le view model pour le drop down des poids predifini suivant le calibre
   * Afficher le poind en grains et le poids en gramme
   * @param weights AmmunitionWeightDto[]
   */
  private createWeightVM(weights: Array<AmmunitionWeightDto>): void {
    this.weights = weights;
    this.weightsVM = weights.map((weight) => {
      return {
        id: weight.id,
        label: `${weight.grains} grains - ${weight.grams?.toFixed(2)} grammes`
      };
    });
  }

  /**
   * Converti les grain en grammes suivant la convertion 1 grain =  0.06479891 granmes
   * @param grain le poid en grain
   */
  private convertGrainToGramme(grain: number): number {
    return grain * 0.06479891;
  }
}
