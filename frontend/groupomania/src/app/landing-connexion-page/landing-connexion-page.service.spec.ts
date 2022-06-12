import { TestBed } from '@angular/core/testing';

import { LandingConnexionPageService } from './landing-connexion-page.service';

describe('LandingConnexionPageService', () => {
  let service: LandingConnexionPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingConnexionPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
