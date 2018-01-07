import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorInformerComponent } from './color-informer.component';

describe('ColorInformerComponent', () => {
  let component: ColorInformerComponent;
  let fixture: ComponentFixture<ColorInformerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorInformerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorInformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
