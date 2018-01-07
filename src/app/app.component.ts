import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = `Men's Colors Recognizer`;
  public initialForm: FormGroup;

  ngOnInit(): void {
    this.initialForm = new FormGroup({
      red: new FormControl(0),
      green: new FormControl(0),
      blue: new FormControl(0),
      hash: new FormControl('000000'),
    });
  }
}
