import { TestBed, inject } from '@angular/core/testing';

import { TableserviceService } from './tableservice.service';

describe('TableserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableserviceService]
    });
  });

  it('should be created', inject([TableserviceService], (service: TableserviceService) => {
    expect(service).toBeTruthy();
  }));
});
