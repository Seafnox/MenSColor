import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgbSeparatedFormComponent } from './rgb-separated-form.component';

describe('RgbSeparatedFormComponent', () => {
  let component: RgbSeparatedFormComponent;
  let fixture: ComponentFixture<RgbSeparatedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgbSeparatedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgbSeparatedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
