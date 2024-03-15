import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Comment } from '../components/comment/comment.component';
import { defaultComment } from '../constants';
import { LocalStorageService } from '../../shared/service/local-storage.service';

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
export class CommentsService {
  private readonly commentsKey = 'comments';

  private readonly persistedCommentKey = 'persistedComment';

  commentsSubject = new BehaviorSubject<Comment[]>([]);

  constructor(private localStorage: LocalStorageService) {
    this.refreshComments();
  }

  addComment(comment: NewCommentProps): void {
    const existingComments = this.getComments();
    const newComment = {
      ...defaultComment,
      ...comment,
      id: String(Date.now()),
    };
    existingComments.push(newComment);
    this.localStorage.setItem(this.commentsKey, existingComments);
    this.refreshComments();
  }

  editComment(updatedComment: NewCommentProps, id: string): void {
    const existingComments = this.getComments();
    const updatedComments = existingComments.map(comment => {
      if (comment.id === id) {
        return { ...comment, ...updatedComment };
      }
      return comment;
    });
    this.localStorage.setItem(this.commentsKey, updatedComments);
    this.refreshComments();
  }

  removeComment(id: string): void {
    const existingComments = this.getComments();
    const updatedComments = existingComments.filter(
      comment => comment.id !== id
    );
    this.localStorage.setItem(this.commentsKey, updatedComments);
    this.refreshComments();
  }

  persistComment(persistedComment: PersistedCommentProps, id?: string): void {
    if (!id) {
      this.localStorage.setItem(this.persistedCommentKey, persistedComment);
      return;
    }

    const existingComments = this.getComments();
    const updatedComments = existingComments.map(comment => {
      if (comment.id === id) {
        return { ...comment, ...persistedComment };
      }
      return comment;
    });

    this.localStorage.setItem(this.commentsKey, updatedComments);
  }

  getPersistedComment(id?: string): Comment | undefined {
    if (!id) {
      const persistedComment = this.localStorage.getItem(
        this.persistedCommentKey
      );
      return persistedComment ? persistedComment : defaultComment;
    }

    const existingComments = this.getComments();
    return existingComments.find(comment => comment.id === id);
  }

  getFilteredComments(selectedTag: string): Observable<Comment[]> {
    return this.commentsSubject.pipe(
      map(comments => {
        if (!selectedTag) {
          return comments;
        } else {
          return comments.filter(comment =>
            comment.tags.some(tag => selectedTag.includes(tag))
          );
        }
      })
    );
  }

  private getComments(): Comment[] {
    return this.localStorage.getItem(this.commentsKey) || [];
  }

  private refreshComments(): void {
    const comments = this.getComments();
    this.commentsSubject.next(comments);
  }
}
