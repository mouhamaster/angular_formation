import { Injectable } from '@angular/core';
import {Category} from "../model/category.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private categories!:Array<Category>;
  constructor() {
    this.categories=[
      {id:1,name:"Fasfoot",description:"Lorem ipsum"},
      {id:2,name:"Dibiterie",description:"Lorem ipsum"},
      {id:3,name:"Glacier",description:"Lorem ipsum"}
    ]
  }
  public getAllCategories():Observable<Category[]>{
    return of(this.categories);
  }
}
