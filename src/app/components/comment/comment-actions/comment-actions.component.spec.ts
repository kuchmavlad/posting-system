import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentActionsComponent } from './comment-actions.component';

describe('CommentActionsComponent', () => {
  let component: CommentActionsComponent;
  let fixture: ComponentFixture<CommentActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentActionsComponent]
    });
    fixture = TestBed.createComponent(CommentActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
