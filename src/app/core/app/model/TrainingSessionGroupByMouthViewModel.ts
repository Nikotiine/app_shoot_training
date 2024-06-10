import { TrainingSessionDto } from '../../api/models/training-session-dto';

export interface TrainingSessionGroupByMouthViewModel {
  mouth: string;
  trainingSessions: TrainingSessionDto[];
}
