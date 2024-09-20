import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private readonly _monthNames = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
  ];
  public getMonthNameWithIndex(index: number): string {
    if (index < 0 || index > 11) {
      throw new Error('Index must be between 0 and 11');
    }

    return this._monthNames[index];
  }

  public getMonths(): string[] {
    return this._monthNames;
  }
}
