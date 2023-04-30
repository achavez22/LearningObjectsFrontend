import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private loginService: LoginService, 
    private router: Router 
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isLoginIn() && this.loginService.getUserRole() == 'ADMIN' ){ 
      if(this.isTokenExpirado()){ 
        this.loginService.logoutUser(); 
        this.router.navigate(['/login']);
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  public isTokenExpirado():boolean{ 
    let token = this.loginService.getToken(); 
    let payload =  this.loginService.getDataToken(token);
    let now =  new Date().getTime() / 1000;
    if(payload < now){ 
      return true; 
    }
    return false; 
  }
  
}
