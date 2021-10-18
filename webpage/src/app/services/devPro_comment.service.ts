import { DevPro_Comment } from '../models/devPro_comment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/skillsme/devPro_comments' //CH1 8080-8081

@Injectable({
  providedIn: 'root'
})
export class DevPro_CommentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable< DevPro_Comment[]> {
    return this.http.get< DevPro_Comment[]>(baseUrl);
  }

  findBydev_projectId(dev_projectId:any): Observable< DevPro_Comment[]> {
    return this.http.get< DevPro_Comment[]>(`${baseUrl}?dev_projectId=${dev_projectId}`);
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
  get(id: any): Observable< DevPro_Comment> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  
}