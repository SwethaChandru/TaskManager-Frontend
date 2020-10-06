import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;
  flag:boolean=false;

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    let id=localStorage.getItem('id');
    this.authservice.profile(JSON.parse(id)).subscribe((res:any)=>{
      console.log(res);
      this.profile=res;
      this.flag=true;
    })
  }

}
