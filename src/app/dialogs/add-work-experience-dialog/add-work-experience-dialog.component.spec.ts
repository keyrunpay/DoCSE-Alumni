import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkExperienceDialogComponent } from './add-work-experience-dialog.component';

describe('AddWorkExperienceDialogComponent', () => {
  let component: AddWorkExperienceDialogComponent;
  let fixture: ComponentFixture<AddWorkExperienceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkExperienceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkExperienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
