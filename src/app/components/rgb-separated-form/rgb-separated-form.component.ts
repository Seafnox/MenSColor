import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { RgbSeparatedFormInterface } from './data/rgbSeparatedForm.interface';

const existedColors = [
  'red',
  'green',
  'blue',
];

@Component({
  selector: 'app-rgb-separated-form',
  templateUrl: './rgb-separated-form.component.html',
  styleUrls: ['./rgb-separated-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RgbSeparatedFormComponent implements OnChanges, OnDestroy {
  @Input() form: RgbSeparatedFormInterface;
  public redSubscription: Subscription;
  public greenSubscription: Subscription;
  public blueSubscription: Subscription;

  ngOnChanges({form}: SimpleChanges): void {
    if (form) {
      this.unsubscribeAll();
      if (this.form instanceof FormGroup) {
        this.subscribeAll();
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  public subscribeAll(): void {
    this.unsubscribeAll();
    existedColors.forEach((colorName: string) => {
      if (!(this.form.controls[colorName] instanceof FormControl)) {
        return;
      }

      this[`${colorName}Subscription`] = this.form.controls[colorName].valueChanges
        .subscribe((value: number) => {
          if (typeof value !== 'number') {
            const newValue = parseInt(value || '0', 10);
            this.form.patchValue({[colorName]: newValue});
            return;
          }

          if (value < 0) {
            this.form.patchValue({[colorName]: 0});
            return;
          }

          if (value > 255) {
            this.form.patchValue({[colorName]: 255});
            return;
          }
        });
    });
  }

  public unsubscribeAll(): void {
    existedColors.forEach((colorName: string) => {
      if (this.hasOwnProperty(`${colorName}Subscription`) && this[`${colorName}Subscription`]) {
        this[`${colorName}Subscription`].unsubscribe();
      }
    });
  }
}
