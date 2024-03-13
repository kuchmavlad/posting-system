import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  private readonly persistedCommentKey = 'persistedComment';

  private commentsSubject = new BehaviorSubject<Comment[]>([]);

  constructor() {
    this.refreshComments();
  }

  private simulateRequest(): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(resolve, 500);
    });
  }

  private getComments(): Comment[] {
    const existingComments = localStorage.getItem(this.commentsKey);
    return existingComments ? JSON.parse(existingComments) : [];
  }

  private refreshComments(): void {
    const comments = this.getComments();
    this.commentsSubject.next(comments);
  }

  addComment(comment: NewCommentProps): Promise<void> {
    return this.simulateRequest().then(() => {
      const existingComments = this.getComments();
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
    });
  }

  editComment(updatedComment: NewCommentProps, id: string): Promise<void> {
    return this.simulateRequest().then(() => {
      const existingComments = this.getComments();
      const updatedComments = existingComments.map(comment => {
        if (comment.id === id) {
          comment = { ...comment, ...updatedComment };
        }

        return comment;
      });

      localStorage.setItem(this.commentsKey, JSON.stringify(updatedComments));
      this.refreshComments();
    });
  }

  removeComment(id: string): Promise<void> {
    return this.simulateRequest().then(() => {
      const existingComments = this.getComments();
      const updatedComments = existingComments.filter(
        comment => comment.id !== id
      );

      localStorage.setItem(this.commentsKey, JSON.stringify(updatedComments));
      this.refreshComments();
    });
  }

  persistComment(persistedComment: PersistedCommentProps, id?: string): void {
    if (!id) {
      localStorage.setItem(
        this.persistedCommentKey,
        JSON.stringify(persistedComment)
      );

      return;
    }

    const existingComments = this.getComments();
    const updatedComments = existingComments.map(comment => {
      if (comment.id === id) {
        comment = { ...comment, ...persistedComment };
      }

      return comment;
    });

    localStorage.setItem(this.commentsKey, JSON.stringify(updatedComments));
  }

  getPersistedComment(id?: string): Comment | undefined {
    if (!id) {
      const existingComments = localStorage.getItem(this.persistedCommentKey);
      return existingComments ? JSON.parse(existingComments) : defaultComment;
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
}
