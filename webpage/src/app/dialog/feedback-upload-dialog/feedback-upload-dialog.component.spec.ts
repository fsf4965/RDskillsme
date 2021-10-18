import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackUploadDialogComponent } from './feedback-upload-dialog.component';

describe('FeedbackUploadDialogComponent', () => {
  let component: FeedbackUploadDialogComponent;
  let fixture: ComponentFixture<FeedbackUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackUploadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
