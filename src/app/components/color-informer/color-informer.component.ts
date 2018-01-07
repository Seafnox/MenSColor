import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColorModel } from '../../models/ColorModel';

@Component({
  selector: 'app-color-informer',
  templateUrl: './color-informer.component.html',
  styleUrls: ['./color-informer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorInformerComponent {
  @Input() hash: string;

  public hashColor(): string {
    if (typeof this.hash !== 'string') {
      return '';
    }
    let hashColor = this.hash;
    try {
      hashColor = ColorModel.stabilizeHash(this.hash);
    } catch (err) {
      console.error(err.toString());
    }
    return `#${hashColor}`;
  }
}
