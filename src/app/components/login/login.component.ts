import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'username':new FormControl(null,{validators:[Validators.required]}),
      'password':new FormControl(null,{validators:[Validators.required]})
    })
  }

  onLoginForm()
  {
    if(this.form.invalid)
    {
      alert("fill all the fields");
      return
    }
    console.log(this.form.value);
    let newUser={
      username:this.form.value.username,
      password:this.form.value.password,
    }
    this.authservice.login(newUser).subscribe((res:any)=>{
      console.log(res);
      let token=res.token;
      let id=res.id;
      let role=res.role;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('id',JSON.stringify(id));
      localStorage.setItem('role',role);
      localStorage.setItem('username',res.username);
      this.authservice.authStatusListener.next(true);
      this.router.navigate(['/profile']);
    },err=>{
      alert(err.error.message);
    })
  }

}
