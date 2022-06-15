import { TestBed } from '@angular/core/testing';

import { LoginPageServiceService } from './login-page-service.service';

describe('LoginPageServiceService', () => {
  let service: LoginPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
