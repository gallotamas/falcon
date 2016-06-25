/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ImpressionSocketService } from './impression-socket.service';

describe('ImpressionSocket Service', () => {
  beforeEachProviders(() => [ImpressionSocketService]);

  it('should ...',
      inject([ImpressionSocketService], (service: ImpressionSocketService) => {
    expect(service).toBeTruthy();
  }));
});
