import { TestBed } from '@angular/core/testing';

import { MainServiceServiceService } from './main-service-service.service';

describe('MainServiceServiceService', () => {
  let service: MainServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
