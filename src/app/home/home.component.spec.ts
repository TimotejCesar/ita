import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { PostComponent } from '../post/post.component';
import { PostListComponent } from '../post-list/post-list.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ HomeComponent, PostComponent, PostListComponent ],
      providers: [PostsService]
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(PostsService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.page-title').textContent).toContain('Welcome to ITA reddit');
  })

  it('should fetch posts', () => {
    spyOn(service, 'getPosts').and.callThrough();
    component.ngOnInit();
    expect(service.getPosts).toHaveBeenCalled();
  })

  it('should set the posts after fetching', async(() => {
    component.ngOnInit();

    fixture.whenStable().then(() => { (2)
      expect(component.posts[0].title).toEqual('title1');
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelectorAll('.post').length).toEqual(2);
    })

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
  }))
});
