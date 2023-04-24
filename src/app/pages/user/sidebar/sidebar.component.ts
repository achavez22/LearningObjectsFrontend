import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  public categories; 
  constructor(private categotyService:  CategoryService){}
  ngOnInit(): void {
    this.categotyService.categories().subscribe(
      (data: any) => { 
        this.categories = data;
      }, 
      (error) => { 
        console.log(error);
      } 
    );
  }

}
