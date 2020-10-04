import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {TaskService} from '../../shared/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  userdetails:Array<any>=[];
  adminid:string;
  form:FormGroup

  constructor(private authservice:AuthService,private taskservice:TaskService) { }

  ngOnInit(): void {
    this.adminid=localStorage.getItem('id');
    this.form=new FormGroup({
      'title':new FormControl(null,{validators:[Validators.required]}),
      'date':new FormControl(null,{validators:[Validators.required]}),
      'user':new FormControl(null,{validators:[Validators.required]}),
      'description':new FormControl(null,{validators:[Validators.required]}),
      'comments':new FormControl(null,{validators:[Validators.required]})
    })
    this.authservice.getuser(JSON.parse(this.adminid)).subscribe((res:any)=>{
      console.log(res);
      this.userdetails=res;
    })
  }

  onAddTask()
  {
    console.log(this.form.value);
    let newTask={
      title:this.form.value.title,
      description:this.form.value.description,
      userAssigned:this.form.value.user,
      date:this.form.value.date,
      comment:this.form.value.comments,
      adminid:JSON.parse(this.adminid)
    }
    this.taskservice.addtask(newTask).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    })
  }

}
