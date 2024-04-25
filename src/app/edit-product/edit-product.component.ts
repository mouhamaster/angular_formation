import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productId!:string;
  productFormGroup!:FormGroup
  product!:Product
  constructor(private route : ActivatedRoute,
              public productService:ProductService,private fb:FormBuilder,private router:Router) {
    // recuperer l'id qui se trouve dans le route
    this.productId=this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe({
      next:(product)=>{
        this.product=product;
      },
      error:(err)=>{
        console.log(err);
      }
    });
    this.productFormGroup=this.fb.group({
      name:this.fb.control(this.product.name,[Validators.required,Validators.minLength(4)]),
      price:this.fb.control(this.product.price,[Validators.required,Validators.min(200)]),
      promotion:this.fb.control(this.product.promotion,[Validators.required])
    })
  }

  handleEditProduct() {
    let p=this.productFormGroup.value;
    p.id=this.product.id;
    this.productService.EditProduct(p).subscribe({
      next:(prod)=>{
        alert("product update succesfully");
        this.router.navigateByUrl("/admin/products")

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
