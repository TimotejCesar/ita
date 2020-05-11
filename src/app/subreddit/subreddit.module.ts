import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubredditRoutingModule } from './subreddit-routing.module';
import { SubredditComponent } from './subreddit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SubredditComponent],
  imports: [
    CommonModule,
    SubredditRoutingModule,
    SharedModule
  ]
})
export class SubredditModule { }
