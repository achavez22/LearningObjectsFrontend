import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  public category = {
    title:  '', 
    description: ''
  };

  constructor( 
    private categoryService:  CategoryService, 
    private snack:  MatSnackBar, 
    private router:  Router, 
    ){}

  ngOnInit(): void {
    
  }

  public formSubmit(){ 
     // console.log('click en submit');
      if(this.category.title.trim() == '' ||  this.category.title == null){ 
        this.snack.open("Title is required", 'close', { 
          duration: 3000
        })
        return; 
      }

      if(this.category.description.trim() == '' ||  this.category.description == null){ 
        this.snack.open("Description is required", 'close', { 
          duration: 3000
        })
        return; 
      }

      this.categoryService.addCategory(this.category).subscribe(
        (data:  any)=> { 
          this.router.navigate(['/admin/categories'])
          Swal.fire( 'Success ', 'Category is added successfuly', 'success');
        },
        (error)=> { 
          console.log(error);
          Swal.fire( 'Error ', 'Server error!', 'error');
        }
      );

  }



}
