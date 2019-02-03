import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component ({
  selector: 'app-post-list',
  styleUrls: ['./post-list.component.css'],
  templateUrl: './post-list.component.html'
})

export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'first post', content: 'this is the first post'},
  //   {title: 'Second post', content: 'this is the second post'},
  //   {title: 'third post', content: 'this is the third post'},
  // ];

  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit () { // executed when component is created
    this.posts = this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdatedListiner()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy () {
    this.postSub.unsubscribe();
  }
}
