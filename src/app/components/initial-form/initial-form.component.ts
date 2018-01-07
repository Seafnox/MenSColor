import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ColorModel, ColorSeparatedData } from '../../models/ColorModel';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import { InitialFormInterface } from './data/initialForm.interface';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.css']
})
export class InitialFormComponent implements OnChanges, OnDestroy {
  @Input() form: InitialFormInterface;
  public colorsSubscription: Subscription;
  public hashSubscription: Subscription;

  ngOnChanges({form}: SimpleChanges) {
    if (form) {
      this.unsubscribeAll();

      if (!(this.form instanceof FormGroup)) {
        this.form = new FormGroup({
          red: new FormControl(0),
          green: new FormControl(0),
          blue: new FormControl(0),
          hash: new FormControl('000000'),
        }) as InitialFormInterface;
      }

      this.subscribeAll();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  public unsubscribeAll(): void {
    if (this.hashSubscription) {
      this.hashSubscription.unsubscribe();
    }
    if (this.colorsSubscription) {
      this.colorsSubscription.unsubscribe();
    }
  }

  public subscribeAll(): void {
    this.catchHashChanges();
    this.catchColorsChanges();
  }

  private catchHashChanges(): void {
    this.hashSubscription = this.form.controls.hash.valueChanges
      .subscribe((hash: string) => {
        let separatedData: ColorSeparatedData;

        try {
          separatedData = ColorModel.colorHashDataToSeparatedData({hash});
        } catch (err) {
          console.error(err.toString());
          separatedData = {} as any;
        }

        const {red = 0, green = 0, blue = 0} = separatedData;
        const {red: currentRed, green: currentGreen, blue: currentBlue} = this.form.value;
        let patchingValue = {};
        if (currentRed !== red) {
          patchingValue = {...patchingValue, red};
        }
        if (currentGreen !== green) {
          patchingValue = {...patchingValue, green};
        }
        if (currentBlue !== blue) {
          patchingValue = {...patchingValue, blue};
        }

        if (Object.keys(patchingValue).length !== 0) {
          this.form.patchValue(patchingValue);
        }
      });
  }

  private catchColorsChanges(): void {
    this.colorsSubscription = Observable.combineLatest([
        this.form.controls.red.valueChanges.startWith(this.form.controls.red.value),
        this.form.controls.green.valueChanges.startWith(this.form.controls.green.value),
        this.form.controls.blue.valueChanges.startWith(this.form.controls.blue.value),
      ])
      .debounceTime(100)
      .subscribe(([red = 0, green = 0, blue = 0]: [number, number, number]) => {
        const oldHash = this.form.controls.hash.value;
        let separatedData: ColorSeparatedData;

        try {
          separatedData = ColorModel.colorHashDataToSeparatedData({hash: oldHash});
        } catch (err) {
          console.error(err.toString());
          separatedData = {} as any;
        }
        const {red: hashRed = 0, green: hashGreen = 0, blue: hashBlue = 0} = separatedData;

        if (hashRed !== red || hashGreen !== green || hashBlue !== blue) {
          const hash = ColorModel.getHashFromRgb(red, green, blue);
          this.form.patchValue({hash});
        }
      });
  }

}
