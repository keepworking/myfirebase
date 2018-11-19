import { TestBed } from '@angular/core/testing';

import { FireworksService } from './fireworks.service';

describe('FireworksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireworksService = TestBed.get(FireworksService);
    expect(service).toBeTruthy();
  });
});
