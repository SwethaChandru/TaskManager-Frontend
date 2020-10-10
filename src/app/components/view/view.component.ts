import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private authService:AuthService) { }
  
  userdetails:Array<any>=[];
  admin;

  ngOnInit(): void {
    let aid=localStorage.getItem('id');
    this.admin=JSON.parse(aid);
    this.authService.getuser(this.admin).subscribe((res:any)=>{
      this.userdetails=res;
      console.log(res);
    })
  }

  delete(id)
  {
    if(confirm("Are you sure to delete "))
    {
      this.authService.deleteuser(id).subscribe((res:any)=>{
      window.location.reload();
    })
    }    
  }
}
