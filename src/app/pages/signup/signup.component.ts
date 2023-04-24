import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(
    private userService:  UserService, 
    private matSnackBar: MatSnackBar
  ){}

  public user = {
    username: '',
    password: '', 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '' 
  };

  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log(this.user);
    
    if(this.user.username == '' || this.user.username == null){
        // alert('Username is required');
        this.matSnackBar.open('Username is required', 'close', { 
          duration: 3000, 
          verticalPosition: 'top', 
          horizontalPosition: 'right'
        });
        return;
    }
    if(this.user.password == '' || this.user.password == null){ 
      this.matSnackBar.open('Password is required', 'close', { 
        duration: 3000, 
        verticalPosition: 'top', 
        horizontalPosition: 'right'
      });
      return;
    }
    if(this.user.firstName == '' || this.user.firstName == null){ 
      this.matSnackBar.open('firstName is required', 'close', { 
        duration: 3000, 
        verticalPosition: 'top', 
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data: any) => { 
          console.log(data); 
          // alert("success");
          this.clearUser();
          Swal.fire('Success done', 'User id is '+ data.id, "success");
      }, 
      error => { 
        console.log(error); 
        // alert("something went wront");
        this.matSnackBar.open('something went wrong! ', 'Close', {
          duration: 3000, 
          verticalPosition: 'top', 
          horizontalPosition: 'right'
        })
      }
    )
  }

  private clearUser():  void{ 
    this.user.email = ''; 
    this.user.username = '';
    this.user.password = '';
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.phone = '';
  }

}
