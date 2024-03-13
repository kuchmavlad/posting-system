import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tags_mock } from 'src/app/constants';

@Component({
  selector: 'app-actions-popup',
  templateUrl: './actions-popup.component.html',
  styleUrls: ['./actions-popup.component.scss'],
})
export class ActionsPopupComponent {
  showPopup: boolean = false;

  @Input() btnText: string = '';

  @Output() selectTagHandle = new EventEmitter<string>();

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  emitSelectedTag(value: string) {
    this.showPopup = false;
    this.selectTagHandle.emit(value);
  }

  protected readonly tags_mock = tags_mock;
}
