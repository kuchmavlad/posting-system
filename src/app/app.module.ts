import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { UserAvatarComponent } from '../shared/components/user-avatar/user-avatar.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentActionsComponent } from './components/comment/comment-actions/comment-actions.component';
import { TagListComponent } from '../shared/components/tag-list/tag-list.component';
import { ActionsPopupComponent } from '../shared/components/actions-popup/actions-popup.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCommentComponent,
    UserAvatarComponent,
    CommentBoxComponent,
    CommentComponent,
    CommentActionsComponent,
    TagListComponent,
    ActionsPopupComponent,
    CommentsListComponent,
  ],
  imports: [BrowserModule, NgOptimizedImage, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
