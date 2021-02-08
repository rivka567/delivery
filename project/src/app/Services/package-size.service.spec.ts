import { TestBed } from '@angular/core/testing';

import { PackageSizeService } from './package-size.service';

describe('PackageSizeService', () => {
  let service: PackageSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
