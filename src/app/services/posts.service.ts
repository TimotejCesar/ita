import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { of, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  ROOT_URL = "https://www.reddit.com";
  API_URL = "/api/v1/"

  constructor(private http: HttpClient) { }

  public getPosts(subreddit = null): Observable<Post[]> {
    return this.http.get(`${this.ROOT_URL}/r/${subreddit || 'all'}/.json`).pipe(
      map((res: any) => this.extractPosts(res))
    )
  }

  public search(q, limit?:number, category?:string, sort?:string) {
    return this.http.get(`${this.ROOT_URL}/search.json?q=${q || ''}&limit=${limit || ''}&category=${category || ''}&sort=${sort || ''}`).pipe(
      map((res: any) => this.extractPosts(res))
    )
  }

  private extractPosts(data): Post[] {
    var posts = [];
    data.data.children.forEach(post => {
      posts.push({
        subreddit: post.data.subreddit,
        authorFullname: post.data.author_fullname,
        title: post.data.title,
        subredditNamePrefix: post.data.subreddit_prefixed,
        thumbnailWidth: post.data.thumbnail_width,
        thumbnail: post.data.thumbnail,
        created: post.data.created,
        previewImage: this.replaceEncodedChars(post.data.preview?.images[0]?.source?.url),
        previewVideo: this.replaceEncodedChars(post.data.preview?.reddit_video_preview?.fallback_url),
        selfText: post.data.selftext,
        selfTextHtml: post.data.selftext_html,
        createdUtc: post.data.created_utc,
        isVideo: post.data.is_video,
        videoUrl: this.replaceEncodedChars(post.data.media?.reddit_video?.fallback_url),
        over18: post.data.over_18,
        permalink: post.data.permalink,
        url: post.data.url,
        mediaEmbed: this.replaceEncodedChars(post.data.media_embed?.content)
      })
    });
    return posts;
  }

  private replaceEncodedChars(text: string): string {
    if (!text) {
      return null;
    }
    var elem = document.createElement('textarea');
    elem.innerHTML = text;
    return elem.innerText;
  }
}
