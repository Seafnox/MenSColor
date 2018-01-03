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
        if (currentRed === red && currentGreen === green && currentBlue === blue) {
          return;
        }
        this.colorForm.patchValue({red, green, blue});
      });

    this.colorsSubscription = Observable.combineLatest([
      this.colorForm.controls.red.valueChanges.startWith(this.colorForm.controls.red.value),
      this.colorForm.controls.green.valueChanges.startWith(this.colorForm.controls.green.value),
      this.colorForm.controls.blue.valueChanges.startWith(this.colorForm.controls.blue.value),
    ])
      .subscribe(([red, green, blue]: [number, number, number]) => {
        let hash: string;

        try {
          hash = ColorModel.colorSeparatedDataToHashData({red, green, blue}).hash;
        } catch (err) {
          console.error(err.toString());
        }

        const currentHash = this.colorForm.controls.hash.value;

        if (!hash || hash === currentHash) {
          return;
        }

        this.colorForm.patchValue({hash});
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
