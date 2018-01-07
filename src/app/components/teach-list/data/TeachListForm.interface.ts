import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TeachListItemFormInterface } from '../../teach-list-item/data/teachListItemForm.interface';
import { TeachListItemFormValueInterface } from '../../teach-list-item/data/TeachListItemFormValue.interface';

export interface TeachListFormInterface extends FormArray {
  controls: TeachListItemFormInterface[];
  value: TeachListItemFormValueInterface[];
  valueChanges: Observable<TeachListItemFormValueInterface[]>;
}
