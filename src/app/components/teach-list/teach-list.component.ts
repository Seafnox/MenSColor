import { Component, Input } from '@angular/core';
import { TeachListItemFormInterface } from '../teach-list-item/data/teachListItemForm.interface';
import { TeachListFormInterface } from './data/TeachListForm.interface';
import { generateTeachListItemForm } from './data/teachListItemForm.generator';

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

    this.formArray.push(this.getNewTeachListItemForm());
  }

  public getNewTeachListItemForm(): TeachListItemFormInterface {
    return generateTeachListItemForm();
  }
}
