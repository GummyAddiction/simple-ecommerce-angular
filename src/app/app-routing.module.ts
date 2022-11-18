import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { UserFormComponent } from './admin/user-form/user-form.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ShopComponent, canActivate: [AuthGuardService]},
  { path: 'shop/:categoryid', component: ShopComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/product', component: AdminProductComponent },
  { path: 'admin/category', component: AdminCategoryComponent },
  {path: 'admin/user', component: AdminUserComponent},
  { path: 'admin/product/form', component: ProductFormComponent, },
  { path: 'admin/category/form', component: CategoryFormComponent },
  { path: 'admin/user/form', component: UserFormComponent },
  { path: 'admin/product/form/:id', component: ProductFormComponent, },
  { path: 'admin/category/form/:categoryid', component: CategoryFormComponent },
  { path: 'admin/user/form/:id', component: UserFormComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
