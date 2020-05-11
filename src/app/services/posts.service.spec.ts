import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { Post } from '../models/post.model'
import { PostsService } from './posts.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('PostsService', () => {

  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });

    service = TestBed.get(PostsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(TestBed.get(PostsService)).toBeTruthy();
  });

  it('should return an Observable<Post[]>', () => {
    service.getPosts().subscribe(
      (posts: Post[]) => {
        expect(posts[0].title).toEqual('title1');
        expect(posts[0].subreddit).toEqual('funny');

        expect(posts[1].title).toEqual('title2');
        expect(posts[1].subreddit).toEqual('memes');
      }
    )

    const req = httpMock.expectOne(`https://www.reddit.com/r/all/.json`);
    expect(req.request.method).toBe('GET');

    req.flush({
      data: {
        children: [
          {
            data: {
              title: 'title1',
              subreddit: 'funny'
            }
          },
          {
            data: {
              title: 'title2',
              subreddit: 'memes'
            }
          }
        ]
      }
    })

    httpMock.verify();
  })

  it('with subreddit parameter should return an Observable<Post[]> where the posts have the given subreddit', () => {
    service.getPosts('memes').subscribe(
      (posts: Post[]) => {
        expect(posts[0].title).toEqual('title1');
        expect(posts[0].subreddit).toEqual('memes');

        expect(posts[1].title).toEqual('title2');
        expect(posts[1].subreddit).toEqual('memes');
      }
    )

    const req = httpMock.expectOne(`https://www.reddit.com/r/memes/.json`);
    expect(req.request.method).toBe('GET');

    req.flush({
      data: {
        children: [
          {
            data: {
              title: 'title1',
              subreddit: 'memes'
            }
          },
          {
            data: {
              title: 'title2',
              subreddit: 'memes'
            }
          }
        ]
      }
    })

    httpMock.verify();
  })

  it('should return an Observable<Post[]>', () => {
    service.search('burger').subscribe(
      (posts: Post[]) => {
        expect(posts[0].title).toEqual('title1');
        expect(posts[0].subreddit).toEqual('funny');

        expect(posts[1].title).toEqual('title2');
        expect(posts[1].subreddit).toEqual('memes');
      }
    )

    const req = httpMock.expectOne(`https://www.reddit.com/search.json?q=burger&limit=&category=&sort=`);
    expect(req.request.method).toBe('GET');

    req.flush({
      data: {
        children: [
          {
            data: {
              title: 'title1',
              subreddit: 'funny'
            }
          },
          {
            data: {
              title: 'title2',
              subreddit: 'memes'
            }
          }
        ]
      }
    })

    httpMock.verify();
  })

  it('with limit parameter should return an Observable<Post[]> where the posts have the given limit', () => {
    service.search('burger', 2).subscribe(
      (posts: Post[]) => {
        expect(posts.length <= 2).toBeTruthy();
      }
    )

    const req = httpMock.expectOne(`https://www.reddit.com/search.json?q=burger&limit=2&category=&sort=`);
    expect(req.request.method).toBe('GET');

    req.flush({
      data: {
        children: [
          {
            data: {
              title: 'title1',
              subreddit: 'memes'
            }
          },
          {
            data: {
              title: 'title2',
              subreddit: 'memes'
            }
          }
        ]
      }
    })

    httpMock.verify();
  })

  it('should replace "amp;" in preview image url', () => {
    service.search('burger').subscribe(
      (posts: Post[]) => {
        console.log(posts);
        expect(posts[0].previewImage.indexOf('amp;') >= 0).toBeTrue();
      }
    )

    const req = httpMock.expectOne(`https://www.reddit.com/search.json?q=burger&limit=&category=&sort=`);
    expect(req.request.method).toBe('GET');

    req.flush({
      data: {
        children: [
          {
            data: {
              title: 'title1',
              subreddit: 'memes',
              preview: {
                images: [
                 {
                    source: {
                      url: 'test.com?video=testamp;s=123312'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    })

    httpMock.verify();
  })
});
