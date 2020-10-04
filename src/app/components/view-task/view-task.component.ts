import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../shared/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  taskDetails:Array<any>=[];
  adminid:string;

  constructor(private taskservice:TaskService) { }

  ngOnInit(): void {
    this.adminid=localStorage.getItem('id');
    this.taskservice.getTaskByAdmin(JSON.parse(this.adminid)).subscribe((res:any)=>{
      console.log(res);
      this.taskDetails=res;
    })
  }

}
