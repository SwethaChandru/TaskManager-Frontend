import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form:FormGroup;
  userId:string;
  changeflag:boolean=false;
  signupflag:boolean=false;
  passflag:boolean=false;
  public mode="";
  userDetail;
  adminid;
  editflag:boolean=false;
  createflag:boolean=false;

  constructor(private authService:AuthService,private route:Router,public router:ActivatedRoute ) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'username':new FormControl(null,{validators:[Validators.required]}),
      'name':new FormControl(null,{validators:[Validators.required]}),
      'role':new FormControl(null,{validators:[Validators.required]}),
      'email':new FormControl(null,{validators:[Validators.required]}),
      'phonenum':new FormControl(null,{validators:[Validators.required]}),
      'password':new FormControl(null,{validators:[Validators.required]})
    })
    this.router.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('change'))
      {
        console.log(paramMap.get('change'));
        this.changeflag=true;
      }
      else
      {
        this.signupflag=true;
      }
      if(paramMap.has('userId'))
      {
        this.mode='edit';
        this.editflag=true;
        this.userId=paramMap.get('userId');
        console.log(this.userId);
        this.authService.getuserById(this.userId).subscribe((res:any)=>{
          console.log(res);
          this.userDetail=res;
          console.log(this.userDetail);
          this.form.patchValue({username: this.userDetail.username });
          this.form.patchValue({ name: this.userDetail.name});
          this.form.patchValue({role:this.userDetail.role});
          this.form.patchValue({email:this.userDetail.email});
          this.form.patchValue({phonenum:this.userDetail.phonenum});
          this.form.patchValue({password:this.userDetail.password});
        })
      }
      else
      {
        this.createflag=true;
        this.mode='create';
        this.userId=null;
        console.log(this.mode);
      }
    })
  }
  onSignupForm()
  {
    if(this.form.invalid)
    {
      alert("Fill alll the fields");
      return;
    }
    this.adminid=localStorage.getItem('id');
    if(this.mode==="create")
    {
      console.log(this.form.value);
      let user={
      username:this.form.value.username,
      password:this.form.value.password,
      role:this.form.value.role,
      phonenum:this.form.value.phonenum,
      email:this.form.value.email,
      name:this.form.value.email,
      adminId:JSON.parse(this.adminid)
    }
    this.authService.signup(user).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    },err=>{
      alert(err.error.message);
    })
  }
  else
  {
    let user={
      username:this.form.value.username,
      password:this.form.value.password,
      role:this.form.value.role,
      phonenum:this.form.value.phonenum,
      email:this.form.value.email,
      name:this.form.value.email,
      id:this.userId
    }
    this.authService.updateuser(user).subscribe((res:any)=>{
      console.log(res);
      this.form.reset();                                                
    })
  }
}

onChangeForm(form:NgForm)
{
  if(form.invalid)
  {
    alert("Fill all the fields");
    return;
  }
  let id=localStorage.getItem('id');
  console.log(form.value);
  let newpass={
    id:JSON.parse(id),
    old:form.value.old,
    new:form.value.new
  }
  console.log(newpass);
  this.authService.changepass(newpass).subscribe((res:any)=>{
    console.log(res);
    form.reset();
  },err=>{
    alert(err.error.message);
  })
}



}
