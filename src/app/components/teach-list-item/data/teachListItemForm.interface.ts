import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TeachListItemFormValueInterface } from './TeachListItemFormValue.interface';

export interface TeachListItemFormInterface extends FormGroup {
  controls: {
    red: FormControl;
    green: FormControl;
    blue: FormControl;
    result: FormControl;
  };
  value: TeachListItemFormValueInterface;
  valueChanges: Observable<TeachListItemFormValueInterface>;
}
