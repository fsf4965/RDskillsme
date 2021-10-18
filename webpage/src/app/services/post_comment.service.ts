import { Post_Comment } from '../models/post_comment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/skillsme/post_comments' //CH1 8080-8081

@Injectable({
  providedIn: 'root'
})
export class Post_CommentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable< Post_Comment[]> {
    return this.http.get< Post_Comment[]>(baseUrl);
  }

  findBypostId(postId:any): Observable< Post_Comment[]> {
    return this.http.get< Post_Comment[]>(`${baseUrl}?postId=${postId}`);
  }

  create(data: any): Observable<any> {
   // alert(data.isuploaded)

    return this.http.post(baseUrl, data);
    
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  get(id: any): Observable< Post_Comment> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  
}