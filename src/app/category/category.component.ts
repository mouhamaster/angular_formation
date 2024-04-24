import {Component, OnInit} from '@angular/core';
import {Category} from "../model/category.model";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
   categories!:Array<Category>;

  constructor(private categoryService:CategoryService) {
  }
  public handleGetAllCategories(){
   this.categoryService.getAllCategories().subscribe({
     next:(data)=>{
       this.categories=data;
    }
   })
  }
  ngOnInit(): void {
    this.handleGetAllCategories();
  }

}
