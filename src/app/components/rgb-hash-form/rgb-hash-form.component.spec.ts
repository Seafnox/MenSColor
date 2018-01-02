import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgbHashFormComponent } from './rgb-hash-form.component';

describe('RgbHashFormComponent', () => {
  let component: RgbHashFormComponent;
  let fixture: ComponentFixture<RgbHashFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgbHashFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgbHashFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
