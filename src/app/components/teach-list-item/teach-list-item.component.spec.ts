import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachListItemComponent } from './teach-list-item.component';

describe('TeachListItemComponent', () => {
  let component: TeachListItemComponent;
  let fixture: ComponentFixture<TeachListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
