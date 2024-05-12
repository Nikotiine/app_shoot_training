import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  // Private field
  public static readonly GREEN_COLOR = '#63de7b';
  public static readonly LIGHT_GREEN_COLOR = '#63deb3';
  public static readonly LIGHT_BLUE_COLOR = '#36d1dc';
  public static readonly ORANGE_COLOR = '#f1880d';
  public static readonly RED_COLOR = '#ef5959';
  public static readonly BLACK_COLOR = '#070707';
  public static readonly GRAY_COLOR = '#cbcbcb';

  /**
   * Retroune la couleur des tag pour les diffentes distances
   * @param distance
   */
  public getDistanceSeverity(distance: number | undefined): string {
    let severity: string = '';
    if (distance) {
      if (distance > 1 && distance < 49) {
        severity = 'info';
      } else if (distance < 149) {
        severity = 'primary';
      } else if (distance < 299) {
        severity = 'warning';
      } else {
        severity = 'danger';
      }
    }
    return severity;
  }

  public getScoreColor(score: number | undefined): string {
    let color: string = '';
    if (score) {
      if (score > 1 && score < 39) {
        color = ColorService.RED_COLOR;
      } else if (score < 54) {
        color = ColorService.ORANGE_COLOR;
      } else if (score < 74) {
        color = ColorService.LIGHT_BLUE_COLOR;
      } else if (score < 85) {
        color = ColorService.LIGHT_GREEN_COLOR;
      } else {
        color = ColorService.GREEN_COLOR;
      }
    }
    return color;
  }

  public getWindSpeedColor(speed: number | undefined): string {
    let color: string = 'text-green-400';

    if (speed) {
      if (speed === 0) {
        color = 'text-green-400';
      } else if (speed > 0 && speed < 4) {
        color = 'text-cyan-500';
      } else if (speed < 8) {
        color = 'text-orange-500';
      } else {
        color = 'text-red-500';
      }
    }
    return color;
  }

  public getAverageGapColor(bestGap: number, gap: number): string {
    let color: string = '';
    const percentageDifference = ((gap - bestGap) / bestGap) * 100;

    if (percentageDifference <= 10) {
      color = ColorService.GREEN_COLOR;
    } else if (percentageDifference > 10 && percentageDifference <= 50) {
      color = ColorService.LIGHT_BLUE_COLOR;
    } else {
      color = ColorService.RED_COLOR;
    }
    return color;
  }

  public getActiveColor(active: boolean): string {
    return active ? ColorService.BLACK_COLOR : ColorService.GRAY_COLOR;
  }
}
