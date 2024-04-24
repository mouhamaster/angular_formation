import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {CategoryComponent} from "./category/category.component";

const routes: Routes = [
  {path:"products", component:ProductsComponent},
  {path:"customers",component:CustomersComponent},
  {path:"categories",component:CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
