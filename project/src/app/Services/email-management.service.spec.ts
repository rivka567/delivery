import { TestBed } from '@angular/core/testing';

import { EmailManagementService } from './email-management.service';

describe('EmailManagementService', () => {
  let service: EmailManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
