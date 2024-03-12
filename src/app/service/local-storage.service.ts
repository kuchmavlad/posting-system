import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../components/comment/comment.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly commentsKey = 'comments';

  private readonly savedTextKey = 'savedText';

  private commentsSubject = new BehaviorSubject<Comment[]>([]);

  constructor() {
    this.refreshComments();
  }

  getComments(): Observable<Comment[]> {
    return this.commentsSubject.asObservable();
  }

  addComment(value: string): void {
    const existingComments = this.getCommentsValue();

    const newComment: Comment = {
      id: String(Date.now()),
      title: 'This is an item',
      text: value,
      savedText: '',
      tags: ['bug', 'issue', 'etc'],
    };

    localStorage.setItem(
      this.commentsKey,
      JSON.stringify([...existingComments, newComment])
    );

    this.refreshComments();
  }

  editComment(value: string, id: string): void {
    const existingComments = this.getCommentsValue();
    const updatedComments = existingComments.map(comment => {
      if (comment.id === id) {
        comment.text = value;
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

  saveCommentText(value: string, id?: string): void {
    if (!id) {
      localStorage.setItem(this.savedTextKey, value);
    }

    const existingComments = this.getCommentsValue();
    const updatedComments = existingComments.map(comment => {
      if (comment.id === id) {
        comment.savedText = value;
      }

      return comment;
    });

    localStorage.setItem(this.commentsKey, JSON.stringify(updatedComments));
  }

  getCommentText(id?: string): string {
    if (!id) {
      return localStorage.getItem(this.savedTextKey) || '';
    }

    const existingComments = this.getCommentsValue();
    const updatedComments = existingComments.find(comment => comment.id === id);
    return updatedComments?.savedText || '';
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
