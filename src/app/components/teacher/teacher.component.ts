import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { BrainJsService } from '../../services/brain-js/brain-js.service';
import { BrainLessonInterface } from '../../services/brain-js/data/brain-lesson.interface';
import { TeachDataInterface } from '../teach-list-item/data/teachData.interface';
import { TeachListItemFormValueInterface } from '../teach-list-item/data/TeachListItemFormValue.interface';
import { generateTeachListItemForm } from '../teach-list/data/teachListItemForm.generator';
import { teachDataList } from './data/teachDataList.config';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {

  public teachForm: FormArray;
  public teaching = false;
  public teachingStateWatchSubscription: Subscription;

  constructor(
    public brainService: BrainJsService,
  ) {}

  ngOnInit() {
    this.teachForm = new FormArray([]);

    teachDataList.forEach(({red, green, blue, result}: TeachDataInterface) =>
      this.teachForm.push(generateTeachListItemForm(red, green, blue, result)));

    this.teachingStateWatchSubscription = this.brainService.onTeaching$
      .subscribe((teaching: boolean) => this.teaching = teaching);
  }

  public startTeach(): void {
    const teachItems: TeachListItemFormValueInterface[] = this.teachForm.value;
    const lessons: BrainLessonInterface[] = teachItems
      .map(({red, green, blue, result}: TeachListItemFormValueInterface) => ({
        input: {red, green, blue},
        output: result,
      }));
    this.brainService.setLessons(lessons);
    this.brainService.teach();
  }

}
