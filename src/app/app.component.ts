import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { Comment } from './components/comment/comment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}

  comments: Comment[] = [];

  selectedTags: string = '';

  ngOnInit(): void {
    this.refreshComments();
  }

  onTagsChange(tag: string): void {
    this.toggleTag(tag);
    this.refreshComments();
  }

  private refreshComments(): void {
    this.localStorageService
      .getFilteredComments(this.selectedTags)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  private toggleTag(tag: string) {
    this.selectedTags = this.selectedTags === tag ? '' : tag;
  }
}
