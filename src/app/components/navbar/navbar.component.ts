import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public IsAuth=localStorage.getItem('token')!=null?true:false;
  public authListenerSubs:Subscription;
  isuser:boolean=localStorage.getItem('role')=="user"?true:false;
  isadmin:boolean=localStorage.getItem('role')=="admin"?true:false;
  role:string;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    const role=localStorage.getItem('role');
    console.log(JSON.parse);
    console.log("entered headers on init function");
    this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.IsAuth=isAuthenticated;
      this.isuser=localStorage.getItem('role')=="user"?true:false;
      this.isadmin=localStorage.getItem('role')=="admin"?true:false;
      console.log("hloo");
    });
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/']);
    this.authService.authStatusListener.next(false);
  }

}
