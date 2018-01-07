import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TeachListItemFormInterface } from '../teach-list-item/data/teachListItemForm.interface';
import { TeachResult } from '../teach-list-item/data/teachResult.enum';
import { TeachListFormInterface } from './data/TeachListForm.interface';

@Component({
  selector: 'app-teach-list',
  templateUrl: './teach-list.component.html',
  styleUrls: ['./teach-list.component.css']
})
export class TeachListComponent {
  @Input() formArray: TeachListFormInterface;

  public addNewTeach(): void {
    if (!this.formArray) {
      return;
    }

    this.formArray.push(this.generateNewTeachListItemForm());
  }

  public generateNewTeachListItemForm(): TeachListItemFormInterface {
    return new FormGroup({
      red: new FormControl(0),
      green: new FormControl(0),
      blue: new FormControl(0),
      result: new FormControl(TeachResult.black),
    }) as TeachListItemFormInterface;
  }
}
