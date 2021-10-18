import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDevProjectsComponent } from './my-dev-projects.component';

describe('MyDevProjectsComponent', () => {
  let component: MyDevProjectsComponent;
  let fixture: ComponentFixture<MyDevProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDevProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDevProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
