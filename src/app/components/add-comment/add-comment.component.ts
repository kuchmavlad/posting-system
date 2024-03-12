import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Comment } from '../comment/comment.component';
import { defaultComment } from 'src/app/constants';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnChanges, OnInit {
  constructor(private localStorageService: LocalStorageService) {
    this.comment = defaultComment;
  }

  value: string = '';

  tags: string[] = [];

  @Input() comment: Comment;

  @Input() editMode = false;

  @Output() cancelHandle = new EventEmitter<void>();

  emitCancel() {
    this.value = this.comment.text;
    this.tags = this.comment.tags;
    this.localStorageService.persistComment(
      { persistedText: this.comment.text, persistedTags: this.comment.tags },
      this.comment.id
    );
    this.cancelHandle.emit();
  }

  addCommentHandle() {
    this.localStorageService.addComment({ text: this.value, tags: this.tags });
    this.localStorageService.persistComment({
      persistedText: '',
      persistedTags: [],
    });
    this.value = '';
    this.tags = [];
  }

  selectTagHandle(value: string) {
    if (this.tags.includes(value)) {
      this.tags = this.tags.filter(tag => tag !== value);
    } else {
      this.tags = [...this.tags, value];
    }

    this.persistCommentHandle();
  }

  editCommentHandle() {
    this.localStorageService.editComment(
      { text: this.value, tags: this.tags },
      this.comment.id
    );
    this.value = '';
    this.tags = [];
  }

  persistCommentHandle() {
    this.localStorageService.persistComment(
      { persistedText: this.value, persistedTags: this.tags },
      this.comment.id
    );
  }

  ngOnInit() {
    const persistedComment = this.localStorageService.getCommentText(
      this.comment.id
    );

    if (persistedComment) {
      this.value = persistedComment.persistedText;
      this.tags = persistedComment.persistedTags;
    }
  }

  ngOnChanges() {
    if (this.editMode) {
      this.value = this.comment.text;
      this.tags = this.comment.tags;
    }
  }
}
