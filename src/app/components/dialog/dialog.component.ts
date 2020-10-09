import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {TaskService} from '../../shared/task.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  flag:boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private router:Router,private taskservice:TaskService) { }

  isuser:boolean=localStorage.getItem('role')=="user"?true:false;
  isadmin:boolean=localStorage.getItem('role')=="admin"?true:false;
  isVisible = -1;
  itemsList = [
    {name: 'completed'},
    {name: 'delayed'}
  ];
  reason:string;
  status:string;

  ngOnInit(): void {
    console.log(this.data);
  }
  edit()
  {
    this.router.navigate(['/editTask',this.data.id])
  }
  delete()
  {
    this.taskservice.deleteTask(this.data.id).subscribe((res:any)=>{
      window.location.reload();
    })
  }
  store(value)
  {
    this.reason=value;
  }
  onItemChange(item) {
    this.status=item;
    if(item=="delayed")
    {
      this.isVisible=1;
    }
    else
    {
      this.isVisible=-1;
    }
    // this.isVisible = i;
 }
  changestatus()
  {
    if(this.status==null)
    {
      alert("choose the status")
    }
    if(this.status==="delayed")
    {
      if(this.reason==null)
      {
        alert("enter the reson")
        return
      }
      let detail={
        status:this.status,
        id:this.data.id,
        reason:this.reason
      }
      this.taskservice.updateDelayStatus(detail).subscribe((res:any)=>{
        console.log(res);
        window.location.reload();
      },err=>{
        alert(err.error.message);
      })
    }
    
    if(this.status=="completed")
    {
      let detail={
        status:this.status,
        id:this.data.id
      }
      this.taskservice.updateComplete(detail).subscribe((res:any)=>{
        console.log(res);
        window.location.reload();
      })
    }
  }

}
