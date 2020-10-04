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
  return this.http.post("http://localhost:3000/user/login",user);
}
signup(user)
{
  return this.http.post("http://localhost:3000/user/signup",user);
}
getuser(id)
{
  return this.http.get("http://localhost:3000/user/getuser/"+id);
}
getuserById(id)
{
  return this.http.get("http://localhost:3000/user/"+id);
}
deleteuser(id)
{
  return this.http.delete("http://localhost:3000/user/"+id);
}
updateuser(user)
{
  return this.http.put("http://localhost:3000/user",user);
}
}
