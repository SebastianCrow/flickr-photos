import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterToolboxComponent } from './filter-toolbox.component';

describe('FilterToolboxComponent', () => {
  let component: FilterToolboxComponent;
  let fixture: ComponentFixture<FilterToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
