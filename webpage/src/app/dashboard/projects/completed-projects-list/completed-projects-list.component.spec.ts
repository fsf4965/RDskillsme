import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedProjectsListComponent } from './completed-projects-list.component';

describe('CompletedProjectsListComponent', () => {
  let component: CompletedProjectsListComponent;
  let fixture: ComponentFixture<CompletedProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedProjectsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
