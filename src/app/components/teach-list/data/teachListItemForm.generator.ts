import { FormControl, FormGroup } from '@angular/forms';
import { TeachListItemFormInterface } from '../../teach-list-item/data/teachListItemForm.interface';
import { TeachResult } from '../../teach-list-item/data/teachResult.enum';

export function generateTeachListItemForm(red: number = 0, green: number = 0, blue: number = 0, result: TeachResult = TeachResult.black): TeachListItemFormInterface {
  return new FormGroup({
    red: new FormControl(red),
    green: new FormControl(green),
    blue: new FormControl(blue),
    result: new FormControl(result),
  }) as TeachListItemFormInterface;
}
