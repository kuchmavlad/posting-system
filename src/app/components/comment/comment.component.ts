import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultComment } from 'src/app/constants';

export interface Comment {
  id: string;
  text: string;
  persistedText: string;
  persistedTags: string[];
  tags: string[];
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  constructor() {
    this.comment = defaultComment;
  }

  editMode = false;

  @Input() comment: Comment;

  @Output() removeCommentEvent = new EventEmitter<string>();

  editHandle() {
    this.editMode = !this.editMode;
  }

  async removeHandle() {
    this.removeCommentEvent.emit(this.comment.id);
  }
}
