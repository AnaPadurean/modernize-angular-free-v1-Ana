import { TestBed } from '@angular/core/testing';

import { MasiniServiceService } from './masini-service.service';

describe('MasiniServiceService', () => {
  let service: MasiniServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasiniServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
