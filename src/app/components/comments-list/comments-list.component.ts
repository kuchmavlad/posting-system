import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment/comment.component';
import { CommentsService } from '../../service/comments.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  constructor(private commentsService: CommentsService) {}

  comments: Comment[] = [];

  selectedTags: string = '';

  private refreshComments(): void {
    this.commentsService
      .getFilteredComments(this.selectedTags)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  private toggleTag(tag: string) {
    this.selectedTags = this.selectedTags === tag ? '' : tag;
  }

  ngOnInit(): void {
    this.refreshComments();
  }

  onTagsChange(tag: string): void {
    this.toggleTag(tag);
    this.refreshComments();
  }

  async removeHandle(id: string) {
    await this.commentsService.removeComment(id);
  }
}
