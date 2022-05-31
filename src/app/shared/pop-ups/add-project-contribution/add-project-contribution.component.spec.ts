import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectContributionComponent } from './add-project-contribution.component';

describe('AddProjectContributionComponent', () => {
  let component: AddProjectContributionComponent;
  let fixture: ComponentFixture<AddProjectContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
