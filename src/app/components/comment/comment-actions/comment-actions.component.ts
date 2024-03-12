import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comment-actions',
  templateUrl: './comment-actions.component.html',
  styleUrls: ['./comment-actions.component.scss'],
})
export class CommentActionsComponent {
  @Output() editHandle = new EventEmitter<void>();

  @Output() removeHandle = new EventEmitter<void>();

  emitEdit() {
    this.editHandle.emit();
  }

  emitRemove() {
    this.removeHandle.emit();
  }
}
