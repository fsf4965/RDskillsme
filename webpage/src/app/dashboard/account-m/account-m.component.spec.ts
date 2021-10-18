import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMComponent } from './account-m.component';

describe('AccountMComponent', () => {
  let component: AccountMComponent;
  let fixture: ComponentFixture<AccountMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
