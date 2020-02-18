import { TestBed } from '@angular/core/testing';

import { RequestPollService } from './request-poll.service';

describe('RequestPollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestPollService = TestBed.get(RequestPollService);
    expect(service).toBeTruthy();
  });
});
