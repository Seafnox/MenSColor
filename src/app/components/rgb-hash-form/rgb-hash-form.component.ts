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
        // TODO 0-9ABCDEF checker
      });
  }

  public unsubscribe(): void {
    if (this.hashSubscription) {
      this.hashSubscription.unsubscribe();
    }
  }
}
