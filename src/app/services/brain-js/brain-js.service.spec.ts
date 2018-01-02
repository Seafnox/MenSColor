import { TestBed, inject } from '@angular/core/testing';

import { BrainJsService } from './brain-js.service';

describe('BrainJsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrainJsService]
    });
  });

  it('should be created', inject([BrainJsService], (service: BrainJsService) => {
    expect(service).toBeTruthy();
  }));
});
