import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { Comment } from '../comment/comment.component';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnChanges {
  constructor(private localStorageService: LocalStorageService) {
    this.comment = { id: '', title: '', text: '', tags: [] };
  }
  value = '';

  @Input() comment: Comment;

  @Input() editMode = false;

  @Output() cancelHandle = new EventEmitter<void>();

  emitCancel() {
    this.value = this.comment.text;
    this.cancelHandle.emit();
  }

  addCommentHandle() {
    this.localStorageService.addComment(this.value);
    this.value = '';
  }

  editCommentHandle() {
    this.localStorageService.editComment(this.value, this.comment.id);
    this.value = '';
  }

  ngOnChanges() {
    if (this.editMode) {
      this.value = this.comment.text;
    }
  }
}
