import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("enter auth guard");
    if (localStorage.getItem('role')==="admin")
    {
      console.log("admin");
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
