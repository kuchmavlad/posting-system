import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { Comment } from './components/comment/comment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.getComments().subscribe(comments => {
      this.comments = comments;
    });
  }
}
