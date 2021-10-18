import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDevProjectDetailComponent } from './my-dev-project-detail.component';

describe('MyDevProjectDetailComponent', () => {
  let component: MyDevProjectDetailComponent;
  let fixture: ComponentFixture<MyDevProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDevProjectDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDevProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
