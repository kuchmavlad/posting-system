import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../comment/comment.component';
import { defaultComment } from 'src/app/constants';
import { CommentsService } from '../../service/comments.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  constructor(private commentsService: CommentsService) {}

  value = '';

  tags: string[] = [];

  @Input() comment: Comment = defaultComment;

  @Input() editMode = false;

  @Output() cancelHandle = new EventEmitter<void>();

  ngOnInit() {
    this.initializeComment();
  }

  private initializeComment() {
    if (this.editMode) {
      this.value = this.comment.text;
      this.tags = this.comment.tags;
    }

    const persistedComment = this.commentsService.getPersistedComment(
      this.comment.id
    );

    if (persistedComment) {
      this.value = persistedComment.persistedText || this.comment.text;
      this.tags = persistedComment.persistedTags.length
        ? persistedComment.persistedTags
        : this.comment.tags;
    }
  }

  private persistComment() {
    this.commentsService.persistComment(
      {
        persistedText: this.value,
        persistedTags: this.tags,
      },
      this.comment.id
    );
  }

  private clearInput() {
    this.value = '';
    this.tags = [];
    this.persistComment();
  }

  private addTag(value: string) {
    this.tags = [...this.tags, value];
  }

  private removeTag(value: string) {
    this.tags = this.tags.filter(tag => tag !== value);
  }

  emitCancel() {
    this.value = this.comment.text;
    this.tags = this.comment.tags;

    this.persistComment();

    this.cancelHandle.emit();
  }

  async addCommentHandle() {
    await this.commentsService.addComment({
      text: this.value,
      tags: this.tags,
    });

    this.clearInput();
  }

  selectTagHandle(value: string) {
    this.tags.includes(value) ? this.removeTag(value) : this.addTag(value);

    this.persistComment();
  }

  async editCommentHandle() {
    await this.commentsService.editComment(
      { text: this.value, tags: this.tags },
      this.comment.id
    );

    this.clearInput();
  }

  persistCommentHandle() {
    this.persistComment();
  }
}
