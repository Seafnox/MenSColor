import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BrainJsService } from '../../services/brain-js/brain-js.service';
import { TeachDataInterface } from '../teach-list-item/data/teachData.interface';
import { TeachListItemFormValueInterface } from '../teach-list-item/data/TeachListItemFormValue.interface';
import { generateTeachListItemForm } from '../teach-list/data/teachListItemForm.generator';
import { teachDataList } from './data/teachDataList.config';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  public teachForm: FormArray;
  public teaching = false;

  constructor(
    public brainService: BrainJsService,
  ) {}

  ngOnInit() {
    this.teachForm = new FormArray([]);

    teachDataList.forEach(({red, green, blue, result}: TeachDataInterface) =>
      this.teachForm.push(generateTeachListItemForm(red, green, blue, result)));
  }

  public startTeach(): void {
    const lessons: TeachListItemFormValueInterface[] = this.teachForm.value;

  }

}
