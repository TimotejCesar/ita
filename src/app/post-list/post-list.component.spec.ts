import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { PostComponent } from '../post/post.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostListComponent, PostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render posts', () => {
    component.posts = [
      {
        title: 'title1',
        subreddit: 'funny',
      },
      {
        title: 'title2',
        subreddit: 'memes',
      },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.post').length).toEqual(2);
  });

  it('should display message if no posts are shown', () => {
    component.posts = [];

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.no-posts').length).toBeGreaterThan(0);
  });

  it('should only show posts with images if imageOnly is set to true', () => {
    component.imagesOnly = true;
    component.posts = [
      {
        title: 'title1',
        subreddit: 'funny',
        previewImage: 'imageurl'
      },
      {
        title: 'title2',
        subreddit: 'memes',
        previewImage: null
      },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.post').length).toEqual(1);
  });
});
