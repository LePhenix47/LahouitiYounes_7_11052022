import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingConnexionPageComponent } from './landing-connexion-page.component';

describe('LandingConnexionPageComponent', () => {
  let component: LandingConnexionPageComponent;
  let fixture: ComponentFixture<LandingConnexionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingConnexionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingConnexionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
