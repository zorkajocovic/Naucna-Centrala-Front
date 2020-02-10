import { TestBed } from '@angular/core/testing';

import { CamundaService } from './camunda.service';

describe('CamundaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CamundaService = TestBed.get(CamundaService);
    expect(service).toBeTruthy();
  });
});
