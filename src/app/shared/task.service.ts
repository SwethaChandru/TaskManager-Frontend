import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  addtask(task)
  {
    return this.http.post("http://localhost:3000/task/addtask",task);
  }
  getTaskByAdmin(id)
  {
    return this.http.get("http://localhost:3000/task/"+id);
  }
}
