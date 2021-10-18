import { Post } from './../models/post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/skillsme/posts' //CH1 8080-8081

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(baseUrl);
  }

  
  create(data: any): Observable<any> {
    //alert(data.id)
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
  get(id: any): Observable<Post> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  findByName(name: any): Observable<Post[]> {
    return this.http.get<Post[]>(`${baseUrl}?name=${name}`);
  }
}