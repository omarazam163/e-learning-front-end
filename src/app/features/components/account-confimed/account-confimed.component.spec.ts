import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConfimedComponent } from './account-confimed.component';

describe('AccountConfimedComponent', () => {
  let component: AccountConfimedComponent;
  let fixture: ComponentFixture<AccountConfimedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountConfimedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountConfimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
