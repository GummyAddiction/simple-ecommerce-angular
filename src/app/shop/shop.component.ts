import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { EcommerceService } from '../service/ecommerce.service';
import { EncryptService } from '../service/encrypt.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryid = Number(params.get('categoryid'));
      this.getAllProduct();
      console.log(this.categoryid);
    });
    this.cart = JSON.parse(this.encryptService.getData(this.key));
    this.ecommerceService.checkSession()
    //this.encryptService.clearData();
  }

  getAllProduct(): void {
    this.ecommerceService.getAllProducts().subscribe((data) => {
      if (this.categoryid != 0) {
        this.products = [];
        data.forEach((elemen) => {
          if (elemen.category_id == this.categoryid) {
            this.products.push(elemen);
          }
        });
      } else {
        this.products = data;
      }
    });
  }

  buyProduct(id: number) {
    console.log('isi sebelum');
    console.log(this.encryptService.getData(this.key));
    let cartItem = this.cart.find((cartElemen) => {
      return cartElemen.productId === id;
    });
    if (cartItem?.productId == null) {
      console.log('id null');
      console.log(cartItem?.productId);
      let product = this.products.find((productElemen) => {
        return productElemen.id === id;
      });
      cartItem = {
        productId: product!.id,
        productName: product!.name,
        productImage: product!.image,
        productPrice: product!.price,
        quantity: 1,
        total: Number(product!.price) * 1,
      };
      this.cart.push(cartItem);
    } else {
      this.cart.forEach(
        cartElemen => {
          if(cartElemen.productId == id){
            console.log('masuk cek cart')
           cartElemen.quantity = cartElemen.quantity + 1;
           cartElemen.total = cartElemen.total + cartElemen.productPrice;
          }
        }
      )
      
    }
    this.encryptService.saveData(this.key, JSON.stringify(this.cart))
    console.log('isi sesudah');
    console.log(this.encryptService.getData(this.key));
  }

  onProductClick(id:number){
    this.router.navigate(['detail', id])
  }
}
