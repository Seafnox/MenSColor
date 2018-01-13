import { TeachResult } from '../../../components/teach-list-item/data/teachResult.enum';

export interface BrainLessonInterface {
  input: {
    red: number;
    green: number;
    blue: number;
  };
  output: TeachResult;
}
