import { TeachResult } from './teachResult.enum';

export interface TeachDataInterface {
  inputs: {
    red: number;
    green: number;
    blue: number;
  };
  output: TeachResult;
}
