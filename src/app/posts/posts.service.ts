import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';


// allow us to create a single instance of the service
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts () {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postsData) => {
      this.posts = postsData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdatedListiner () {
    return this.postsUpdated.asObservable();
  }

  addPost (title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};

    this.http.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe(responseData => {
      console.log(responseData.message);

      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
