import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from "./products/products.component";
import { CustomersComponent } from "./customers/customers.component";
import { CategoryComponent } from "./category/category.component";
import { LoginComponent } from "./login/login.component";
import { AdminTemplateComponent } from "./admin-template/admin-template.component";
import {authenticationGuard} from "./guards/authentication.guard";


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: LoginComponent },
  {
    path: "admin",
    component: AdminTemplateComponent,
    canActivate: [authenticationGuard],
    children: [
      { path: "products", component: ProductsComponent },
      { path: "customers", component: CustomersComponent },
    ]
  },
  { path: "categories", component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
