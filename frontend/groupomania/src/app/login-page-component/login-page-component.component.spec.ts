import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponentComponent } from './login-page-component.component';

describe('LoginPageComponentComponent', () => {
  let component: LoginPageComponentComponent;
  let fixture: ComponentFixture<LoginPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
