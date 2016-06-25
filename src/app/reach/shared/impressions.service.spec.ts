/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ImpressionsService } from './impressions.service';

describe('ReachData Service', () => {
  beforeEachProviders(() => [ImpressionsService]);

  it('should ...',
      inject([ImpressionsService], (service: ImpressionsService) => {
    expect(service).toBeTruthy();
  }));
});
