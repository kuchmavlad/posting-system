import { Component, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
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
  constructor(private localStorageService: LocalStorageService) {
    this.comment = defaultComment;
  }

  editMode = false;

  @Input() comment: Comment;

  editHandle() {
    this.editMode = !this.editMode;
  }

  removeHandle() {
    this.localStorageService.removeComment(this.comment.id);
  }
}
