import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ColorHashData, ColorSeparatedData } from '../../../models/ColorModel';

export interface InitialFormInterface extends FormGroup {
  controls: {
    red: FormControl;
    green: FormControl;
    blue: FormControl;
    hash: FormControl;
    [key: string]: AbstractControl;
  };
  value: ColorSeparatedData | ColorHashData;
  valueChanges: Observable<ColorSeparatedData | ColorHashData>;
}
