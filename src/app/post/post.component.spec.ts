import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    component.post = {
      title: "Title"
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-title').textContent).toContain('Title');
  })

  it('should render preview image if it is set', () => {
    component.post = {
      previewImage: "image_url"
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-img-top').src).toContain("image_url")
  });

  it('should render preview video if it is set', () => {
    component.post = {
      previewVideo: "video_url"
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-img-top').src).toContain("video_url")
  })

  it('should render subreddit', () => {
    component.post = {
     subreddit: "memes"
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.subreddit').textContent).toContain("memes")
  });

  it('should render selftext', () => {
    component.post = {
     selfText: "Sample text"
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-text').textContent).toContain("Sample text")
  })

  it('should truncate selftext if it has more than 200 characters', () => {
    component.post = {
     selfText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mauris accumsan, molestie mauris quis, varius libero. Suspendisse potenti. Donec orci magna, ornare at urna nec, tristique accumsan elit. Phasellus porttitor libero ac elit sapien. "
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-text').textContent.length).toBeLessThanOrEqual(200)
  })

  it('should show "Read more" link if selftext is truncated', () => {
    component.post = {
     selfText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mauris accumsan, molestie mauris quis, varius libero. Suspendisse potenti. Donec orci magna, ornare at urna nec, tristique accumsan elit. Phasellus porttitor libero ac elit sapien. "
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.read-more').length).toBeGreaterThan(0);
  });

  it('should show "Read less" and hide "Read more" link if selftext is expanded', () => {
    component.post = {
     selfText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mauris accumsan, molestie mauris quis, varius libero. Suspendisse potenti. Donec orci magna, ornare at urna nec, tristique accumsan elit. Phasellus porttitor libero ac elit sapien. "
    }
    component.readMore();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.read-less').length).toBeGreaterThan(0);
    expect(compiled.querySelectorAll('.read-more').length).toBeLessThan(1);
  })

  it('should expand text when read more is clicked', () => {
    component.post = {
     selfText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mauris accumsan, molestie mauris quis, varius libero. Suspendisse potenti. Donec orci magna, ornare at urna nec, tristique accumsan elit. Phasellus porttitor libero ac elit sapien. "
    }
    component.readMore();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-text').textContent.length).toEqual(component.post.selfText.length);
  })

  it('should render embeded media if it is set', () => {
    component.post = {
     subreddit: "memes",
     mediaEmbed: '<iframe width="400" height="500" src=""></iframe>'
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('iframe').length).toBeGreaterThan(0);
  })

  it('should set the iframe width to 100%', () => {
    component.post = {
     subreddit: "memes",
     mediaEmbed: '<iframe width="400" height="500" src=""></iframe>'
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('iframe').width).toEqual('100%');
  })
});
