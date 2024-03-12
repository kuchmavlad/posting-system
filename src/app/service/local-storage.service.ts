import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from 'src/app/components/comment/comment.component';
import { defaultComment } from 'src/app/constants';

interface NewCommentProps {
  text: string;
  tags: string[];
}

interface PersistedCommentProps {
  persistedText: string;
  persistedTags: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly commentsKey = 'comments';

  private readonly persistedCommentKey = 'persistedCommentKey';

  private commentsSubject = new BehaviorSubject<Comment[]>([]);

  constructor() {
    this.refreshComments();
  }

  getComments(): Observable<Comment[]> {
    return this.commentsSubject.asObservable();
  }

  addComment(comment: NewCommentProps): void {
    const existingComments = this.getCommentsValue();

    const newComment = {
      ...defaultComment,
      ...comment,
      id: String(Date.now()),
    };

    localStorage.setItem(
      this.commentsKey,
      JSON.stringify([...existingComments, newComment])
    );

    this.refreshComments();
  }

  editComment(updatedComment: NewCommentProps, id: string): void {
    const existingComments = this.getCommentsValue();
    const updatedComments = existingComments.map(comment => {
      if (comment.id === id) {
        comment = { ...comment, ...updatedComment };
      }

      return comment;
    });
    localStorage.setItem(this.commentsKey, JSON.stringify(updatedComments));
    this.refreshComments();
  }

  removeComment(id: string): void {
    const existingComments = this.getCommentsValue();
    const updatedComments = existingComments.filter(
      comment => comment.id !== id
    );
    localStorage.setItem(this.commentsKey, JSON.stringify(updatedComments));
    this.refreshComments();
  }

  persistComment(persistedComment: PersistedCommentProps, id?: string): void {
    if (!id) {
      localStorage.setItem(
        this.persistedCommentKey,
        JSON.stringify(persistedComment)
      );

      return;
    }

    const existingComments = this.getCommentsValue();
    const updatedComments = existingComments.map(comment => {
      if (comment.id === id) {
        comment = { ...comment, ...persistedComment };
      }

      return comment;
    });

    localStorage.setItem(this.commentsKey, JSON.stringify(updatedComments));
  }

  getCommentText(id?: string): Comment {
    if (!id) {
      const existingComments = localStorage.getItem(this.persistedCommentKey);
      return existingComments ? JSON.parse(existingComments) : defaultComment;
    }

    const existingComments = this.getCommentsValue();
    const updatedComments = existingComments.find(comment => comment.id === id);
    return updatedComments || defaultComment;
  }

  private getCommentsValue(): Comment[] {
    const existingComments = localStorage.getItem(this.commentsKey);
    return existingComments ? JSON.parse(existingComments) : [];
  }

  private refreshComments(): void {
    const comments = this.getCommentsValue();
    this.commentsSubject.next(comments);
  }
}
