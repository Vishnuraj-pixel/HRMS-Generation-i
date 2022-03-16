import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmployeeDetailsComponent } from './change-employee-details.component';

describe('ChangeEmployeeDetailsComponent', () => {
  let component: ChangeEmployeeDetailsComponent;
  let fixture: ComponentFixture<ChangeEmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmployeeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
