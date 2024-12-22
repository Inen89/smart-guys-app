import { TestBed } from '@angular/core/testing';

import { UsunService } from './usun.service';

describe('UsunService', () => {
  let service: UsunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
