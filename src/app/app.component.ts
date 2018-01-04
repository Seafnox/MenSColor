import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ColorModel, ColorSeparatedData } from './models/ColorModel';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = `Men's Colors Recognizer`;
  public colorForm: FormGroup;
  public colorsSubscription: Subscription;
  public hashSubscription: Subscription;

  ngOnInit(): void {
    this.colorForm = new FormGroup({
      red: new FormControl(0),
      green: new FormControl(0),
      blue: new FormControl(0),
      hash: new FormControl('000000'),
    });

    this.hashSubscription = this.colorForm.controls.hash.valueChanges
      .subscribe((hash: string) => {
        let separatedData: ColorSeparatedData;

        try {
          separatedData = ColorModel.colorHashDataToSeparatedData({hash});
        } catch (err) {
          console.error(err.toString());
          separatedData = {} as any;
        }

        const {red = 0, green = 0, blue = 0} = separatedData;
        const {red: currentRed, green: currentGreen, blue: currentBlue} = this.colorForm.value;
        if (currentRed !== red) {
          this.colorForm.patchValue({red});
        }
        if (currentGreen !== green) {
          this.colorForm.patchValue({green});
        }
        if (currentBlue !== blue) {
          this.colorForm.patchValue({blue});
        }
      });

    this.colorsSubscription = Observable.combineLatest([
      this.colorForm.controls.red.valueChanges.startWith(this.colorForm.controls.red.value),
      this.colorForm.controls.green.valueChanges.startWith(this.colorForm.controls.green.value),
      this.colorForm.controls.blue.valueChanges.startWith(this.colorForm.controls.blue.value),
    ])
      .subscribe(([red = 0, green = 0, blue = 0]: [number, number, number]) => {
        const oldHash = this.colorForm.controls.hash.value;
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
          this.colorForm.patchValue({hash});
        }
      });
  }

  ngOnDestroy(): void {
    if (this.hashSubscription) {
      this.hashSubscription.unsubscribe();
    }
    if (this.colorsSubscription) {
      this.colorsSubscription.unsubscribe();
    }
  }
}
