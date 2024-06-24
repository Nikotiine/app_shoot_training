import { Injectable } from '@angular/core';
import { TrainingSessionGroupCreateDto } from '../../api/models/training-session-group-create-dto';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  /**
   * Compare et reourne le meuilleur groupement de la session
   * @param trainingSessionGroups TrainingSessionGroupDto[]
   */
  public getBestAverage(
    trainingSessionGroups: TrainingSessionGroupCreateDto[]
  ): number {
    let averageGap = null;
    for (const session of trainingSessionGroups) {
      if (session.verticalGap && session.horizontalGap) {
        const average = session.verticalGap + session.horizontalGap;
        if (averageGap === null) {
          averageGap = average;
        } else if (averageGap > average) {
          averageGap = average;
        }
      }
    }
    return averageGap ? averageGap : 0;
  }

  /**
   * Compare et retourne le meuilleur score
   * @param trainingSessionGroups TrainingSessionGroupDto[]
   */
  public getBestScore(
    trainingSessionGroups: TrainingSessionGroupCreateDto[]
  ): number {
    let score: number = 0;
    for (const sessionGroup of trainingSessionGroups) {
      if (sessionGroup.score && score < sessionGroup.score) {
        score = sessionGroup.score;
      }
    }
    return score;
  }
}
