import { TestBed } from '@angular/core/testing';

import { ApiAccountService } from './apiAccount.service';

describe('ApiAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAccountService = TestBed.get(ApiAccountService);
    expect(service).toBeTruthy();
  });
});
