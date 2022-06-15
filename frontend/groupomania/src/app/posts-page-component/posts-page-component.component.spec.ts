import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPageComponentComponent } from './posts-page-component.component';

describe('PostsPageComponentComponent', () => {
  let component: PostsPageComponentComponent;
  let fixture: ComponentFixture<PostsPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsPageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
