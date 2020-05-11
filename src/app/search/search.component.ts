import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string = '';
  posts: Post[] = [];
  searchForm: FormGroup;

  constructor(private route: ActivatedRoute, private postsService: PostsService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      if (this.query) {
        this.getPosts(this.query);
      }
    });

    this.searchForm = this.fb.group({
      term: ['', Validators.required],
      limit: [null],
      category: [''],
      sortBy: ['']
    })
  }

  getPosts(q: string, limit?: number, category?: string, sortBy?: string) {
    this.postsService.search(q, limit, category, sortBy).pipe(
      take(1)
    )
    .subscribe((posts) => {
      this.posts = posts;
    })
  }

  search() {
    if (this.searchForm.valid) {
      const fields = this.searchForm.value;
      this.getPosts(fields.term, fields.limit, fields.category, fields.sortBy);
    }
  }

}
