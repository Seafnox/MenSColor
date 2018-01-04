///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { RgbHashFormInterface } from './data/rgbHashForm.interface';

@Component({
  selector: 'app-rgb-hash-form',
  templateUrl: './rgb-hash-form.component.html',
  styleUrls: ['./rgb-hash-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RgbHashFormComponent implements OnChanges, OnDestroy {
  @Input() form: RgbHashFormInterface;
  public hashSubscription: Subscription;

  ngOnChanges({form}: SimpleChanges): void {
    if (form) {
      this.unsubscribe();
      if (this.form instanceof FormGroup) {
        this.subscribe();
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public subscribe(): void {
    this.unsubscribe();
    this.hashSubscription = this.form.controls.hash.valueChanges
      .subscribe((hash: string = '') => {
        if (hash.startsWith('#')) {
          hash = hash.substring(1);
          this.form.patchValue({hash});
          return;
        }
        if (hash.length > 6) {
          hash = hash.substring(0, 6);
          this.form.patchValue({hash});
          return;
        }
        if (!this.isHex(hash)) {
          hash = hash.split('').filter((char: string) => this.isHex(char)).join('');
          this.form.patchValue({hash});
          return;
        }
      });
  }

  public unsubscribe(): void {
    if (this.hashSubscription) {
      this.hashSubscription.unsubscribe();
    }
  }

  public isHex(hash: string): boolean {
    return /(^[0-9A-F]{0,6}$)/i.test(hash);
  }
}
