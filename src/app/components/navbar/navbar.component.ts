import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  public isLoggedIn = false;  
  public user = null; 
  constructor(private loginService: LoginService, 
    private router: Router){}

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
      window.location.reload();
      this.router.navigate(['/login']); 
      //this.loginService.loginStatusSubject.next(false);
      // window.location.reload();
      
      
  }

}
