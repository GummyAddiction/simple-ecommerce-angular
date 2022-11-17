import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { MenuComponent } from './menu/menu.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import{ BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AdminComponent } from './admin/admin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { UserFormComponent } from './admin/user-form/user-form.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShopComponent,
    HomeComponent,
    CartComponent,
    MenuComponent,
    ProductDetailComponent,
    AdminComponent,
    AdminProductComponent,
    AdminCategoryComponent,
    AdminUserComponent,
    ProductFormComponent,
    UserFormComponent,
    CategoryFormComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
