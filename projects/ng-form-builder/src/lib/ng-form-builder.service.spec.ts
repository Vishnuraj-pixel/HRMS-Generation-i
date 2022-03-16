import { TestBed } from '@angular/core/testing';

import { NgFormBuilderService } from './ng-form-builder.service';

describe('NgFormBuilderService', () => {
  let service: NgFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
