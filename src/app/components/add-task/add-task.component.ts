import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  mode="";
  taskid:string;

  constructor(private authservice:AuthService,private taskservice:TaskService,
    public router:ActivatedRoute,public route:Router) { }

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
    this.router.paramMap.subscribe((paramMap:ParamMap)=>{
        if(paramMap.has('taskid'))
        {
          this.mode='edit'
          this.taskid=paramMap.get('taskid');
          console.log(this.taskid);
  
          this.taskservice.getTaskForEdit(this.taskid).subscribe((res:any)=>{
            console.log(res);
            console.log(res.date);
            this.form.patchValue({title: res.title });
            this.form.patchValue({date: this.formatDate(new Date(res.date))});
            this.form.patchValue({description:res.description});
            this.form.patchValue({user:res.userAssigned});
            this.form.patchValue({comments:res.comments});
          })
        }
        else
        {
          this.mode='create';
          this.taskid=null;
          console.log(this.mode);
        }
      })
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  onAddTask()
  {
    if(this.mode==="create")
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
  else
  {
    let Task={
      id:this.taskid,
      title:this.form.value.title,
      description:this.form.value.description,
      userAssigned:this.form.value.user,
      date:this.form.value.date,
      comment:this.form.value.comments,
      adminid:JSON.parse(this.adminid)
    }
    this.taskservice.updateTask(Task).subscribe((res:any)=>{
      this.route.navigate(['/viewtask']);
    })
  }
}
}
