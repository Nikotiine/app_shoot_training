import { inject, Injectable } from '@angular/core';
import { ApiTrainingSessionService } from '../../api/services/api-training-session.service';

import { TrainingSessionCreateDto } from '../../api/models/training-session-create-dto';
import { Observable } from 'rxjs';
import { TrainingSessionDto } from '../../api/models/training-session-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperTrainingSessionService {
  private readonly apiTrainingSessionService: ApiTrainingSessionService =
    inject(ApiTrainingSessionService);

  public createTrainingSession(
    session: TrainingSessionCreateDto
  ): Observable<TrainingSessionDto> {
    return this.apiTrainingSessionService.createTrainingSession({
      body: session
    });
  }

  public getAllActiveSessionByUser(
    userId: number
  ): Observable<TrainingSessionDto[]> {
    return this.apiTrainingSessionService.getActiveTrainingSessionByUserId({
      id: userId
    });
  }

  public delete(id: number): Observable<TrainingSessionDto[]> {
    return this.apiTrainingSessionService.deleteTrainingSession({
      id: id
    });
  }

  public getAllSessionByUser(id: number): Observable<TrainingSessionDto[]> {
    return this.apiTrainingSessionService.getAllTrainingSessionByUserId({
      id: id
    });
  }

  public getSessionById(id: number): Observable<TrainingSessionDto> {
    return this.apiTrainingSessionService.getTrainingSessionById({
      id: id
    });
  }

  public update(session: TrainingSessionDto): Observable<TrainingSessionDto> {
    return this.apiTrainingSessionService.updateTrainingSession({
      body: session
    });
  }
}
