import {  Dev_Project } from '../models/dev_project.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/skillsme/dev_projects' //CH1 8080-8081

@Injectable({
  providedIn: 'root'
})
export class Dev_ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable< Dev_Project[]> {
    return this.http.get< Dev_Project[]>(baseUrl);
  }

  upload(id: any,file: File,isuploaded:any): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('isuploaded', isuploaded);
    const req = new HttpRequest('PUT', `${baseUrl}/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    console.log(req);
    console.log(formdata)
   return this.http.request<File>(req);
   
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
  get(id: any): Observable< Dev_Project> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  
  findByCurrentprojectId(projectId:any): Observable< Dev_Project[]> {
    return this.http.get< Dev_Project[]>(`${baseUrl}/projectId?projectId=${projectId}`);
  }
  findByCurrentAccountPro(accountID: any): Observable< Dev_Project[]> {
    return this.http.get< Dev_Project[]>(`${baseUrl}?accountId=${accountID}`);
  }
}