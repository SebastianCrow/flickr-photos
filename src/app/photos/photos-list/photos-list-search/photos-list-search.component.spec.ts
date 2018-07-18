import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosListSearchComponent } from './photos-list-search.component';

describe('PhotosListSearchComponent', () => {
  let component: PhotosListSearchComponent;
  let fixture: ComponentFixture<PhotosListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
