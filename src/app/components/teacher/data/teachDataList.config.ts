import { TeachDataInterface } from '../../teach-list-item/data/teachData.interface';
import { TeachResult } from '../../teach-list-item/data/teachResult.enum';

export const teachDataList: TeachDataInterface[] = [
  {red: 0, green: 0, blue: 0, result: TeachResult.black},
  {red: 255, green: 255, blue: 255, result: TeachResult.white},
  {red: 255, green: 0, blue: 0, result: TeachResult.red},
  {red: 255, green: 128, blue: 0, result: TeachResult.orange},
  {red: 255, green: 255, blue: 0, result: TeachResult.yellow},
  {red: 0, green: 255, blue: 0, result: TeachResult.green},
  {red: 0, green: 255, blue: 255, result: TeachResult.lightBlue},
  {red: 0, green: 0, blue: 255, result: TeachResult.darkBlue},
  {red: 255, green: 0, blue: 255, result: TeachResult.purple},
];
