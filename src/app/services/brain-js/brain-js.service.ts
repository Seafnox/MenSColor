import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { TeachResult } from '../../components/teach-list-item/data/teachResult.enum';
import { ColorSeparatedData } from '../../models/ColorModel';
import { BrainLessonInterface } from './data/brain-lesson.interface';
import { default as NeuralNetwork } from 'brain.js/src/neural-network.js';
import { NeuralResultInterface } from './data/neural-result.interface';

@Injectable()
export class BrainJsService {
  private lessons: BrainLessonInterface[] = [];
  private neural: NeuralNetwork;
  private _isTeached = new BehaviorSubject<boolean>(false);
  private _onTeaching = new BehaviorSubject<boolean>(false);

  public setLessons(lessons: BrainLessonInterface[]): void {
    this.forget();
    this.lessons = lessons;
  }

  public teach(): void {
    const trainings = this.lessons.map(({input, output}) => ({
      input: input,
      output: Object.keys(TeachResult).map((key) => TeachResult[key]).reduce((res, item) => {
        res[item] = item === output ? 1 : 0;
        return res;
      }, ({}))
    }));
    console.log('trainings: ');
    trainings.forEach((training) => console.log(JSON.stringify(training)));
    this._onTeaching.next(true);
    setTimeout(() => {
      this.neural.train(trainings, {
        iterations: 500000,
        errorThresh: 0.01,
        callback: this.readyState,
        callbackPeriod: 1000,
        learningRate: 0.03,
      });
      this._onTeaching.next(false);
      this._isTeached.next(true);
      const result = this.asc({red: 255, green: 100, blue: 10});
      console.log('test result: ', result);
    });
  }

  public readyState(argument: {error: number, iterations: number}): void {}

  public forget(): void {
    this.neural = new NeuralNetwork({
      activation: 'tanh',
      hiddenLayers: [4, 4],
    });
    this.lessons = [];
    this._isTeached.next(false);
  }

  public asc(rgb: ColorSeparatedData): NeuralResultInterface {
    return this.neural.run(rgb) as NeuralResultInterface;
  }

  public get isTeached$(): Observable<boolean> {
    return this._isTeached.asObservable();
  }

  public get onTeaching$(): Observable<boolean> {
    return this._onTeaching.asObservable();
  }

}
