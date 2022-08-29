import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, pipe} from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://todos-81b5e-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map(data => {
          const posts: Post[] = [];
          for (const postsKey in data) {
            console.log(typeof postsKey)
            posts.push({...data[postsKey], id: postsKey})
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{name: string}> {
    return this.http.post<{name: string}>('https://todos-81b5e-default-rtdb.firebaseio.com/posts.json', post);
  }

  updatePost(post: Post) {
    const postData = {[post.id]: {title: post.title, description: post.description}};
    return this.http.patch('https://todos-81b5e-default-rtdb.firebaseio.com/posts.json', postData);
  }

  deletePost(id: string) {
    return this.http.delete(`https://todos-81b5e-default-rtdb.firebaseio.com/posts/${id}.json`);
  }
}
