/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PublishCardComponent } from './publish-card.component';

describe('Component: Publish', () => {
  it('should create an instance', () => {
    let component = new PublishCardComponent();
    expect(component).toBeTruthy();
  });
});
