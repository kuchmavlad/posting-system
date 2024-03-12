import { Component, EventEmitter, Output } from '@angular/core';
import { tags_mock } from 'src/app/constants';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
})
export class AddTagsComponent {
  showPopup: boolean = false;

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
