import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  public isLoggedIn = false;  
  public user = null; 
  constructor(public loginService: LoginService ){}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoginIn(); 
    this.user = this.loginService.getUser(); 
    this.loginService.loginStatusSubject.asObservable().subscribe(
      (data) => { 
        this.isLoggedIn = this.loginService.isLoginIn(); 
        this.user = this.loginService.getUser(); 
      })
  }

  public logout(): void{ 
      this.loginService.logoutUser(); 
      //this.loginService.loginStatusSubject.next(false);
      window.location.reload();
      
      
  }

}
