import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedPostsComponent } from './published-posts.component';

describe('PublishedPostsComponent', () => {
  let component: PublishedPostsComponent;
  let fixture: ComponentFixture<PublishedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
