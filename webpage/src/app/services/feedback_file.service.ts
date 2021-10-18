import { FeedbackFile } from './../models/feedback_file.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/skillsme/feedback_files' //CH1 8080-8081

@Injectable({
  providedIn: 'root'
})
export class FeedbackFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File,devID:any): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('dev_projectId', devID);
    const req = new HttpRequest('POST', `${baseUrl}/upload`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
console.log(req);
console.log(formdata)
   return this.http.request<File>(req);
   //return this.http.post(`${baseUrl}/upload`,formdata);
  }

  getFiles(): Observable<FeedbackFile[]> {
    return this.http.get<FeedbackFile[]>(`${baseUrl}/info`);
  }
  
  deleteFile(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  getFilesbyDevID(dev_projectId:any): Observable<FeedbackFile[]> {
    return this.http.get<FeedbackFile[]>(`${baseUrl}/info?dev_projectId=${dev_projectId}`);
  }
}

/*
  getAll(): Observable<File[]> {
    return this.http.get<File[]>(baseUrl);
  }

  
  create(data: any): Observable<any> {
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
  get(id: any): Observable<File> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  
}
*/