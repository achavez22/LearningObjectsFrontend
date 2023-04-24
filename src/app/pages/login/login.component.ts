import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public hide: boolean = true;
  public loginData ={ 
    username: '', 
    password: ''
  };


  constructor(
    private  snack: MatSnackBar, 
    private loginService: LoginService, 
    private router:  Router, 
    ){ 

  }
  ngOnInit(): void {
  }

  formSubmit(){ 
    // console.log("login btn clicked"); 
    if(this.loginData.username.trim()==''  || this.loginData.username == null){
        this.snack.open('Username is required! ', 'close', { 
          duration: 3000, 

        });
        return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) =>{ 
        console.log('success'); 
        console.log(data); 

        //login 
        this.loginService.loginUser(data.token); 

        this.loginService.getCurrentUser().subscribe(
          (user: any)=> { 
            this.loginService.setUser(user); 
            console.log(user);

            if(this.loginService.getUserRole() == 'ADMIN'){ 
                //window.location.href = '/admin';
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);
            }else if(this.loginService.getUserRole() == 'NORMAL'){ 
              //window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            }else { 
              this.loginService.logoutUser(); 
              
            }
            
          });
      }, 
      (error)=> { 
        console.log('error'); 
        console.log(error);
        this.snack.open("Invalid Details!! Try again", 'close', { 
          duration: 2600, 
        } )
      } 
    ); 
  }

  //request to server to generateToken


}
