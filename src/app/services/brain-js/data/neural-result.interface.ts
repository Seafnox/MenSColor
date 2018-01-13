import { TeachResult } from '../../../components/teach-list-item/data/teachResult.enum';

export type Dictionable<T, R> = {
  [P in keyof T]?: R;
};

export type NeuralResultInterface = Dictionable<TeachResult, number>;
