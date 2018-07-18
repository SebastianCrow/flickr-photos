import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosListUserComponent } from './photos-list-user.component';

describe('PhotosListUserComponent', () => {
  let component: PhotosListUserComponent;
  let fixture: ComponentFixture<PhotosListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
