import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from '../post-list/post-list.component';
import { SearchComponent } from '../search/search.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostComponent, PostListComponent, SearchComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    RouterModule
    // FontAwesomeModule
  ],
  exports: [
    PostComponent, PostListComponent, FormsModule, ReactiveFormsModule, SearchComponent, LoadingSpinnerComponent
  ]
})
export class SharedModule { }
