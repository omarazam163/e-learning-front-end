import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleFormAddComponent } from './module-form-add.component';

describe('ModuleFormAddComponent', () => {
  let component: ModuleFormAddComponent;
  let fixture: ComponentFixture<ModuleFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleFormAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
