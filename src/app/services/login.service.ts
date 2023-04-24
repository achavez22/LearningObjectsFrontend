import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>(); 

  constructor(private http: HttpClient) { }

  public getCurrentUser(){ 
     return this.http.get(`${baseUrl}/current-user`); 
  }

  public generateToken(loginData:  any){ 
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  public loginUser(token: any): boolean{ 
      localStorage.setItem('token', token); 
      //this.loginStatusSubject.next(true); 
      return true;
  }

  public isLoginIn(): boolean{ 
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){ 
      return false; 
    }else{ 
      return true; 
    }
  }

 

  public logoutUser(): boolean{ 
    localStorage.removeItem('token'); 
    return true; 
  }

  //get token 
  public getToken(){ 
    return localStorage.getItem('token');
  }

  public setUser(user: any){ 
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){ 
    let userStr = localStorage.getItem('user'); 
    if(userStr != null){ 
      return JSON.parse(userStr); 
    }else{ 
      this.logoutUser(); 
      return null; 
    }
    return ;
  }

  //get user role
  public getUserRole(){ 
    let user = this.getUser(); 
    return user.authorities[0].authority; 
  }
}
