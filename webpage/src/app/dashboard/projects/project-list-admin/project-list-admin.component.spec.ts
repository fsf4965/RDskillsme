import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListAdminComponent } from './project-list-admin.component';

describe('ProjectListAdminComponent', () => {
  let component: ProjectListAdminComponent;
  let fixture: ComponentFixture<ProjectListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
