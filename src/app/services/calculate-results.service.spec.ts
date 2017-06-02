import { TestBed, inject } from '@angular/core/testing';

import { CalculateResultsService } from './calculate-results.service';

describe('CalculateResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculateResultsService]
    });
  });

  it('should ...', inject([CalculateResultsService], (service: CalculateResultsService) => {
    expect(service).toBeTruthy();
  }));
});
