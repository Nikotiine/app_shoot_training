import { TrainingSessionDto } from '../../api/models/training-session-dto';

export interface TrainingSessionGroupByMouthViewModel {
  month: string;
  trainingSessions: TrainingSessionDto[];
}
