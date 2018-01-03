import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ColorHashData } from '../../../models/ColorModel';

export interface RgbHashFormInterface extends FormGroup {
  controls: {
    hash: FormControl;
  };
  value: ColorHashData;
  valueChanges: Observable<ColorHashData>;
}
