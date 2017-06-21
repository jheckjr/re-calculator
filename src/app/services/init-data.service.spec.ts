import { TestBed, inject } from '@angular/core/testing';

import { InitStoreService } from './init-store.service';

describe('InitStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitStoreService]
    });
  });

  it('should ...', inject([InitStoreService], (service: InitStoreService) => {
    expect(service).toBeTruthy();
  }));
});
