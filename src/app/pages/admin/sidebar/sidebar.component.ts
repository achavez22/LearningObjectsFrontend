import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router:Router, 
    private loginService: LoginService){ 

  }
  public logout(): void{  
    this.loginService.logoutUser(); 
    window.location.reload();
    this.router.navigate(['/login']); 
    Swal.fire('Logout',  ` has cerrado sesion con exito! `, 'success' );
  }

}
