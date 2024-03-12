import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';

export interface Comment {
  id: string;
  title: string;
  text: string;
  savedText: string;
  tags: string[];
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  constructor(private localStorageService: LocalStorageService) {
    this.comment = { id: '', title: '', text: '', savedText: '', tags: [] };
  }

  editMode = false;

  @Input() comment: Comment;

  editHandle() {
    this.editMode = !this.editMode;
  }

  removeHandle() {
    const confirmed = window.confirm('Are you sure you want to delete this?');

    if (confirmed) {
      this.localStorageService.removeComment(this.comment.id);
    }
  }
}
