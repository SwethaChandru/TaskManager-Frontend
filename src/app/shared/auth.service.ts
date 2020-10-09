import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authStatusListener=new Subject<boolean>();

  constructor(private http:HttpClient) { }
  

getAuthStatusListener()
{
  return this.authStatusListener.asObservable();
}

login(user)
{
  return this.http.post("https://taskmgr-app-backend.herokuapp.com/user/login",user);
}
signup(user)
{
  return this.http.post("https://taskmgr-app-backend.herokuapp.com/user/signup",user);
}
getuser(id)
{
  return this.http.get("https://taskmgr-app-backend.herokuapp.com/user/getuser/"+id);
}
getuserById(id)
{
  return this.http.get("https://taskmgr-app-backend.herokuapp.com/user/"+id);
}
deleteuser(id)
{
  return this.http.delete("https://taskmgr-app-backend.herokuapp.com/user/"+id);
}
updateuser(user)
{
  return this.http.put("https://taskmgr-app-backend.herokuapp.com/user",user);
}
changepass(detail)
{
  return this.http.put("https://taskmgr-app-backend.herokuapp.com/user/change/",detail);
}
profile(id)
{
  return this.http.get("https://taskmgr-app-backend.herokuapp.com/user/profile/"+id);
}

}
