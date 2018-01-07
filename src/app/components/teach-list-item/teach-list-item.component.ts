import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ColorModel } from '../../models/ColorModel';
import { TeachListItemFormInterface } from './data/teachListItemForm.interface';
import { TeachListItemFormValueInterface } from './data/TeachListItemFormValue.interface';
import { TeachResult } from './data/teachResult.enum';

@Component({
  selector: 'app-teach-list-item',
  templateUrl: './teach-list-item.component.html',
  styleUrls: ['./teach-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachListItemComponent implements OnChanges, OnDestroy {
  @Input() form: TeachListItemFormInterface;

  public teachResults: string[] = Object.keys(TeachResult);
  public formSubscription: Subscription;
  public hash = '';

  ngOnChanges({form}: SimpleChanges): void {
    if (form) {
      this.unsubscribe();
      if (this.form) {
        this.subscribe();
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public subscribe(): void {
    this.formSubscription = this.form.valueChanges.subscribe(({red, green, blue}: TeachListItemFormValueInterface) => {
      try {
        this.hash = ColorModel.getHashFromRgb(red, green, blue);
      } catch (err) {
        console.error(err.toString());
      }
    });
  }

  public unsubscribe(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

}
