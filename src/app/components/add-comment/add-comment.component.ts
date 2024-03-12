import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { Comment } from '../comment/comment.component';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnChanges, OnInit {
  constructor(private localStorageService: LocalStorageService) {
    this.comment = { id: '', title: '', text: '', savedText: '', tags: [] };
  }

  value = '';

  @Input() comment: Comment;

  @Input() editMode = false;

  @Output() cancelHandle = new EventEmitter<void>();

  emitCancel() {
    this.value = this.comment.text;
    this.localStorageService.saveCommentText(
      this.comment.text,
      this.comment.id
    );
    this.cancelHandle.emit();
  }

  addCommentHandle() {
    this.localStorageService.addComment(this.value);
    this.localStorageService.saveCommentText('');
    this.value = '';
  }

  editCommentHandle() {
    this.localStorageService.editComment(this.value, this.comment.id);
    this.value = '';
  }

  saveCommentTextHandle() {
    this.localStorageService.saveCommentText(this.value, this.comment.id);
  }

  ngOnInit() {
    const savedText = this.localStorageService.getCommentText(this.comment.id);

    if (savedText) {
      this.value = savedText;
    }
  }

  ngOnChanges() {
    if (this.editMode) {
      this.value = this.comment.text;
    }
  }
}
