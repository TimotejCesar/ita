import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.scss']
})
export class SubredditComponent implements OnInit {

  posts: Post[];
  subreddit: string;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {
    this.route.params.subscribe(params => {
      this.subreddit = params['subreddit'];
      if (this.subreddit) {
        this.getPosts(this.subreddit);
      }
    });
  }

  ngOnInit(): void {
  }

  public getPosts(subreddit) {
    this.postsService.getPosts(subreddit).subscribe(
      (res: Post[]) => {
        console.log(res);
        this.posts = res;
      }
    )
  }

}
