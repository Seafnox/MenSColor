import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ColorSeparatedData } from '../../../models/ColorModel';

export interface RgbSeparatedFormInterface extends FormGroup {
  controls: {
    red: FormControl;
    green: FormControl;
    blue: FormControl;
  };
  value: ColorSeparatedData;
  valueChanges: Observable<ColorSeparatedData>;
}
