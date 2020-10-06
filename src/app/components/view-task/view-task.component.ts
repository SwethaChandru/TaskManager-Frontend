import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import {TaskService} from '../../shared/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  form:FormGroup;
  taskDetails:Array<any>=[];
  adminid:string;
  singleTask;
  taskid:string;
  flag:boolean=false;
  isuser:boolean=localStorage.getItem('role')=="user"?true:false;
  isadmin:boolean=localStorage.getItem('role')=="admin"?true:false;
  username:string;
  date=" ";
  value=" ";

  constructor(private taskservice:TaskService,private router:Router) { }

  ngOnInit(): void {
    this.adminid=localStorage.getItem('id');
    this.form=new FormGroup({
      'reason':new FormControl(null,{validators:[Validators.required]}),
    })
    if(this.isadmin)
    {
      this.taskservice.getTaskByAdmin(JSON.parse(this.adminid)).subscribe((res:any)=>{
        console.log(res);
        this.taskDetails=res;
      })
    }
    if(this.isuser)
    {
      this.taskservice.getTaskByUser(localStorage.getItem('username')).subscribe((res:any)=>{
        this.taskDetails=res;
        console.log(res);
      })
    }
  }
  DetailedView(task)
  {
    console.log(task);
    var date=new Date(task.date);
    this.singleTask=task;
    this.singleTask.date=date.toDateString();
    this.flag=true;
  }
  delete(id)
  {
    this.taskservice.deleteTask(id).subscribe((res:any)=>{
      window.location.reload();
    })
  }

  taskbyDate(value)
  {
    this.date=value;
    if(this.isadmin)
    {
      this.taskservice.getTaskByDate(value,JSON.parse(this.adminid)).subscribe((res:any)=>{
        console.log(res);
        this.taskDetails=res;
      })
    }
    if(this.isuser)
    {
      this.taskservice.userTaskByDate(value,localStorage.getItem('username')).subscribe((res:any)=>{
        console.log(res);
        this.taskDetails=res;
      })
    }
    
  }

  storeid(id)
  {
    console.log(id);
    this.taskid=id;
  }
  changestatus(status,id)
  {
    console.log(this.form.value);
    console.log(status);
    console.log(id);
    
    if(status==="delayed")
    {
      let detail={
        status:status,
        id:this.taskid,
        reason:this.form.value.reason
      }
      this.taskservice.updateDelayStatus(detail).subscribe((res:any)=>{
        console.log(res);
        window.location.reload();
      },err=>{
        alert(err.error.message);
      })
    }
    
    if(status=="completed")
    {
      let detail={
        status:status,
        id:id
      }
      this.taskservice.updateComplete(detail).subscribe((res:any)=>{
        console.log(res);
        window.location.reload();
      })
    }
  }
  filter(val)
  {
    this.value=val;
    console.log(this.date);
    console.log(this.value);
    this.taskservice.filter(this.date,this.value,JSON.parse(this.adminid)).subscribe((res:any)=>{
      console.log(res);
    })
  }
}
