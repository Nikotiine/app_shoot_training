export interface TrainingSessionTableViewModel {
  id: number;
  setup: string;
  position: string | undefined;
  distance: number | undefined;
  distanceSeverity: string;
  ammunition: string;
  active: boolean;
  date: Date;
}
export interface TrainingSessionViewModel
  extends TrainingSessionTableViewModel {
  bestScore?: number;
  bestScoreTextColor: string;
  bestAverageGap?: number;
  groups?: TrainingGroup[];
  pressure?: number;
  support: string;
  windSpeed?: number;
  windSpeedTextColor?: string;
}
export interface TrainingGroup {
  horizontalGap?: number;
  verticalGap?: number;
  averageGap?: number;
  averageGapColor: string;
  score?: number;
  scoreColor: string;
  totalShoots?: number;
}
