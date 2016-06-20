/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { PublishingItemsService } from './publishing-items.service';

describe('PublishItems Service', () => {
  beforeEachProviders(() => [PublishingItemsService]);

  it('should ...',
      inject([PublishingItemsService], (service: PublishingItemsService) => {
    expect(service).toBeTruthy();
  }));
});
