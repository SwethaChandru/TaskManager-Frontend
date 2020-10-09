import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  addtask(task)
  {
    return this.http.post("https://taskmgr-app-backend.herokuapp.com/task/addtask",task);
  }
  getTaskByAdmin(id)
  {
    return this.http.get("https://taskmgr-app-backend.herokuapp.com/task/"+id);
  }
  getTaskByUser(username)
  {
    return this.http.get("https://taskmgr-app-backend.herokuapp.com/task/usertask/"+username);
  }
  deleteTask(id)
  {
    return this.http.delete("https://taskmgr-app-backend.herokuapp.com/task/delete/"+id);
  }
  getTaskForEdit(id)
  {
    return this.http.get("https://taskmgr-app-backend.herokuapp.com/task/edit/"+id);
  }
  updateTask(task)
  {
    return this.http.put("https://taskmgr-app-backend.herokuapp.com/task/update",task)
  }
  updateComplete(detail)
  {
    return this.http.put("https://taskmgr-app-backend.herokuapp.com/task/",detail)
  }
  updateDelayStatus(detail)
  {
    return this.http.put("https://taskmgr-app-backend.herokuapp.com/task/updatestatus/",detail);
  }
}

