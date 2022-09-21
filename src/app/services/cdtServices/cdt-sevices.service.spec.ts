import { TestBed } from '@angular/core/testing';

import { CdtSevicesService } from './cdt-sevices.service';

describe('CdtSevicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CdtSevicesService = TestBed.get(CdtSevicesService);
    expect(service).toBeTruthy();
  });
});
