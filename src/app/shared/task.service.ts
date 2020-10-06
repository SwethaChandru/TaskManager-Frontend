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
  getTaskByUser(username)
  {
    return this.http.get("http://localhost:3000/task/usertask/"+username);
  }
  getTaskByDate(date,id)
  {
    return this.http.get("http://localhost:3000/task/"+date+"/"+id);
  }
  userTaskByDate(date,username)
  {
    return this.http.get("http://localhost:3000/task/user/"+date+"/"+username)
  }
  deleteTask(id)
  {
    return this.http.delete("http://localhost:3000/task/delete/"+id);
  }
  getTaskForEdit(id)
  {
    return this.http.get("http://localhost:3000/task/edit/"+id);
  }
  updateTask(task)
  {
    return this.http.put("http://localhost:3000/task/update",task)
  }
  updateComplete(detail)
  {
    return this.http.put("http://localhost:3000/task/",detail)
  }
  updateDelayStatus(detail)
  {
    return this.http.put("http://localhost:3000/task/updatestatus/",detail);
  }
  filter(date,value,id)
  {
    return this.http.get("http://localhost:3000/task/filter/"+date+"/"+value+"/"+id);
  }
}

