import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { Calendar, EventApi } from '@fullcalendar/core';
import {  CalendarOptions } from '@fullcalendar/angular'
import { DialogComponent } from '../dialog/dialog.component';
import {TaskService} from '../../shared/task.service';
import { noUndefined } from '@angular/compiler/src/util';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { ArgumentOutOfRangeError } from 'rxjs';
import { AriaDescriber } from '@angular/cdk/a11y';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
ee
  showModal: boolean;
  taskDetails:Array<any>=[];
  adminid:string;
  calendarOptions:CalendarOptions ;
  isuser:boolean=localStorage.getItem('role')=="user"?true:false;
  isadmin:boolean=localStorage.getItem('role')=="admin"?true:false;

  constructor(private taskservice:TaskService,public dialog: MatDialog) {   }

  ngOnInit(): void {
    this.adminid=localStorage.getItem('id');
    if(this.isadmin)
    {
      this.taskservice.getTaskByAdmin(JSON.parse(this.adminid)).subscribe((res:any)=>{
        console.log(res[0]);
        this.taskDetails=res;
        this.call();
        console.log(this.taskDetails);
      })  
    }
    if(this.isuser)
    {
      this.taskservice.getTaskByUser(localStorage.getItem('username')).subscribe((res:any)=>{
        this.taskDetails=res;
        console.log(res);
        this.call();
      })
    }
    
  }

  call()
  {
    for(let i=0;i<this.taskDetails.length;i++)
      {
        if(this.taskDetails[i].status=="pending")
        {
          let color="purple";
          this.taskDetails[i].color=color;
        }
        if(this.taskDetails[i].status=="completed")
        {
          let color="green";
          this.taskDetails[i].color=color;
        }
        if(this.taskDetails[i].status=="delayed")
        {
          let color="red";
          this.taskDetails[i].color=color;
        }
        var d = new Date(this.taskDetails[i].date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
        this.taskDetails[i].date=[year, month, day].join('-');
      }
      console.log(this.taskDetails[0].title);
      this.calendarOptions= {
        initialView: 'dayGridMonth',
        displayEventTime: false,
        dateClick: this.handleDateClick.bind(this), // bind is important!
        eventClick: this.handleEventClick.bind(this),
        events: this.taskDetails ,
      };
  }
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  handleEventClick(arg) {
    console.log(arg.event);
    var d=new Date(arg.event.start);
    let details={
      title:arg.event.title,
      date:d.toDateString(),
      id:arg.event.extendedProps._id,
      status:arg.event.extendedProps.status,
      desc:arg.event.extendedProps.description,
      user:arg.event.extendedProps.userAssigned,
      comments:arg.event.extendedProps.comments,
      reason:arg.event.extendedProps.reason,
      assignBy:null
    }
    if(this.isuser)
    {
      // console.log(arg.event.extendedProps.products.username);
      details.assignBy=arg.event.extendedProps.products.username
    }
    let dialogRef = this.dialog.open(DialogComponent,{
      data:details,
      height: '470px',
      width: '700px'
    });
  }

    // openDialog() {
    //   let dialogRef = this.dialog.open(DialogComponent,{data:{name:'swetha'}});
    // }
 
    
  }
  
