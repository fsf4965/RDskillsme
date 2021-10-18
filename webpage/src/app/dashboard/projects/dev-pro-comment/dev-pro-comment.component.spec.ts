import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProCommentComponent } from './dev-pro-comment.component';

describe('DevProCommentComponent', () => {
  let component: DevProCommentComponent;
  let fixture: ComponentFixture<DevProCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevProCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevProCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
