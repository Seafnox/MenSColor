import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BrainJsService } from '../../services/brain-js/brain-js.service';
import { TeachListItemFormValueInterface } from '../teach-list-item/data/TeachListItemFormValue.interface';

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
  }

  public startTeach(): void {
    const lessons: TeachListItemFormValueInterface[] = this.teachForm.value;

  }

}
