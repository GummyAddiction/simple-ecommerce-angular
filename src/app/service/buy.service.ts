import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Cart } from '../model/cart';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { EcommerceService } from './ecommerce.service';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root',
})
export class BuyService {
  private categoryid!: number;
  public products: Product[] = [];
  public categories: Category[] = [];
  public cart: Cart[] = [];
  public key: string = 'cart';

  constructor(
    private ecommerceService: EcommerceService,
    private router: Router,
    private route: ActivatedRoute,
    private encryptService: EncryptService
  ) {}

  buyService(id: number) {
    this.buyProduct(id);
  }

  buyProduct(id: number) {
    this.ecommerceService.getProductById(id).subscribe((result) => {
      console.log('masuk fungsi utama');
      console.log(this.encryptService.getData(this.key));
      this.cart = JSON.parse(String(this.encryptService.getData(this.key)));
      console.log('isi sebelum');
      console.log(this.encryptService.getData(this.key));
      let cartItem = this.cart.find((cartElemen) => {
        return cartElemen.productId === id;
      });
      if (cartItem?.productId == null) {
        console.log('id null');
        console.log(cartItem?.productId);
        cartItem = {
          productId: result!.id,
          productName: result!.name,
          productImage: result!.image,
          productPrice: result!.price,
          quantity: 1,
          total: Number(result!.price) * 1,
        };
        this.cart.push(cartItem);
      } else {
        this.cart.forEach((cartElemen) => {
          if (cartElemen.productId == id) {
            console.log('masuk cek cart');
            cartElemen.quantity = cartElemen.quantity + 1;
            cartElemen.total = cartElemen.total + cartElemen.productPrice;
          }
        });
      }
      this.encryptService.saveData(this.key, JSON.stringify(this.cart));
      console.log('isi sesudah');
      console.log(this.encryptService.getData(this.key));
    });
  }
}
