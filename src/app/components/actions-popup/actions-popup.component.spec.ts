import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPopupComponent } from './actions-popup.component';

describe('AddTagsComponent', () => {
  let component: ActionsPopupComponent;
  let fixture: ComponentFixture<ActionsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsPopupComponent],
    });
    fixture = TestBed.createComponent(ActionsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
