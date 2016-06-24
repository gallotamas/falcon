/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { PublishSocketService } from './publish-socket.service';

describe('PublishSocket Service', () => {
  beforeEachProviders(() => [PublishSocketService]);

  it('should ...',
      inject([PublishSocketService], (service: PublishSocketService) => {
    expect(service).toBeTruthy();
  }));
});
