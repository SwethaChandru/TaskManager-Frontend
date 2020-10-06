import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("enter auth guard");
    if (localStorage.getItem('role')==="user")
    {
      console.log("user")
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
