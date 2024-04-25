import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {pageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private products!: Array<Product>
  constructor() {
    this.products=[
      {id:UUID.UUID(),name:"computer",price:6500,promotion:true},
      {id:UUID.UUID(),name:"printer",price:2000,promotion:false},
      {id:UUID.UUID(),name:"smart phone",price:200,promotion:true},
    ];
    for(let i=0;i<10;i++){
      this.products.push({id:UUID.UUID(),name:"dell-hp",price:6500,promotion:true});
      this.products.push({id:UUID.UUID(),name:"bloc note",price:6500,promotion:true});
      this.products.push({id:UUID.UUID(),name:"smart tv",price:6500,promotion:true});
    }
  }
  public getAllProducts():Observable<Product[]>{
  let rnd=Math.random();
  if(rnd<0.1) return throwError(()=>new Error("Internet Connexion error"));
  else return of([...this.products]);
  }
  public getPageProducts(page:number,size:number):Observable<pageProduct>{
  // calculer index
    let index=page*size;
   // chercher une page dans la liste
    // calculer la totale des pages
    let totalpages=~~(this.products.length/size);
    if(this.products.length % size!=0)
      totalpages++;
    let pageProducts= this.products.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalpages,products:pageProducts});
  }
  public deleteProduct(id:String):Observable<boolean>{
    this.products= this.products.filter(p=>p.id!=id);
    return of(true);
  }
  public setPromotion(id:String):Observable<boolean>{
    let product=this.products.find(p=>p.id==id);
    if(product!=undefined){
      product.promotion=!product.promotion;
      return of(true);
    }else return throwError(()=>new Error("product not found"));
  }

  // method search product
  public searchProducts(keyword:string,page:number,size:number):Observable<pageProduct>{
   let result=this.products.filter(p=>p.name.includes(keyword));
    let index=page*size;
    // chercher une page dans la liste
    // calculer la totale des pages
    let totalpages=~~(result.length/size);
    if(this.products.length % size!=0)
      totalpages++;
    let pageProducts= result.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalpages,products:pageProducts});
  }
  // ajouter un produit
  public addNewProduct(product:Product):Observable<Product>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public getProductById(id:string):Observable<Product>{
   let product= this.products.find(p=>p.id==id)
    if(product==undefined) return throwError(()=>new Error("product not found"));
    return  of(product);
  }
  public getErrorMessage(fieldName: string, error: ValidationErrors | null) {
    if(error && error['required']) {
      return fieldName + " is Required";
    }
    else if(error && error['minlength']) {
      return fieldName + " should have at least " + error['minlength']['requiredLength'] + " Characters";
    }
    else if(error && error['min']){
      return fieldName + " should have min value " + error['min']['min'];
    }
    else {
      return "";
    }
  }

  public EditProduct(product:Product):Observable<Product>{
      this.products=this.products.map(p=>(p.id==product.id)?product:p);
      return of(product);
  }
}
