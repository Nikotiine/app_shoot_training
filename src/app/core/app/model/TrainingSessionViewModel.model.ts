export interface TrainingSessionViewModel {
  id: number;
  setup: string;
  position: string | undefined;
  distance: number | undefined;
  distanceSeverity: string;
  ammunition: string;
  date: Date;
}
