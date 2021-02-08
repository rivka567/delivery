import { TestBed } from '@angular/core/testing';

import { WaitingMessagesService } from './waiting-messages.service';

describe('WaitingMessagesService', () => {
  let service: WaitingMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
