import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';


// allow us to create a single instance of the service
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts () {
    return [...this.posts];
  }

  getPostUpdatedListiner () {
    return this.postsUpdated.asObservable();
  }

  addPost (title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
