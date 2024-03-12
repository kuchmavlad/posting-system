import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentActionsComponent } from './components/comment/comment-actions/comment-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCommentComponent,
    UserAvatarComponent,
    CommentBoxComponent,
    CommentComponent,
    CommentActionsComponent,
  ],
  imports: [BrowserModule, NgOptimizedImage, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
