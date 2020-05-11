import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Input() imageOnly: boolean = false;

  maxCharacters = 200;

  html = '<iframe width="459" height="344" src="https://www.youtube.com/embed/3DuAF4KOnQM?feature=oembed&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  getEmbedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html.replace(/width="([^"]+)"/, 'width="100%"'));
  }

  truncate(text: string): string {
    if (text.length > this.maxCharacters && this.maxCharacters > -1) {
      return text.substring(0, this.maxCharacters - 3) + '...';
    }
    return text;
  }

  readMore() {
    this.maxCharacters = -1;
  }

  readLess() {
    this.maxCharacters = 200;
  }

}
