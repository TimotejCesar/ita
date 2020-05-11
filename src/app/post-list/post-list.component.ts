import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() posts: Post[] = [];
  @Input() imagesOnly: boolean;

  constructor(private settingsService: SettingsService) {
    this.settingsService.imageOnly.subscribe((val) => {
      this.imagesOnly = val;
    })
  }

  ngOnInit(): void {
  }

  everyNth(start, n, posts): Post[] {
    if (posts) {
      let output = [];
      for (let i = start; i < posts.length; i = i + n) {
        output.push(posts[i])
      }
      return output;
    }
    else {
      return [];
    }
  }

  filterPosts(): Post[] {
    if(this.posts && this.imagesOnly) {
      return this.posts.filter((post) => post.previewImage || post.previewVideo)
    }
    else {
      return this.posts;
    }
  }

}
