import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("enter auth guard");
    if (localStorage.getItem('role')==="admin" || localStorage.getItem('role')==="user")
    {
      console.log("admin");
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
