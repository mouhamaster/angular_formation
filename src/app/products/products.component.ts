import {Component, OnInit, signal} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products!:Array<Product>;
  currentPage:number=0;
  pageSize:number=5;
  totalPage:number=0;
  errorMessage!:string;
  searchFormGroup!:FormGroup
  currentAction:string="all";
  constructor( private productService:ProductService, private fb:FormBuilder,public authService:AuthentificationService) {
  }
  ngOnInit() {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control(null)
    });
     this.handleGetPageProduct();
  }
  handleGetAllProduct(){
    this.productService.getAllProducts().subscribe({
      next:(data)=>{
        this.products=data;
      },
      error:(err)=>{
        this.errorMessage=err;
      }
    });
  }
  handleGetPageProduct(){
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.totalPage=data.totalPages;
      },
      error:(err)=>{
        this.errorMessage=err;
      }
    });
  }
  handleDeleteProduct(p: Product) {
    let conf=confirm("Are you sure");
    if(conf==false)return;
     this.productService.deleteProduct(p.id).subscribe({
       next:(data)=>{
         // this.handleGetAllProduct();
         let index=this.products.indexOf(p);
         this.products.splice(index,1);
       }
     })
  }

  handleSetPromotion(p: Product) {
    let promo=p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next:(data)=>{
        console.log("ok");
        p.promotion=!promo;
      },
      error:(err)=>{
        this.errorMessage=err;
      }
    })
  }
  handleSearchProducts(){
    this.currentAction="search";
    this.currentPage=0;
    //recuperation de la valeur saisi
    let keyword=this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.totalPage=data.totalPages;
      }
    })
  }

  gotoPages(i: number) {
    this.currentPage=i;
    if(this.currentAction=='all')
     this.handleGetPageProduct();
    else
      this.handleSearchProducts()
  }
}
