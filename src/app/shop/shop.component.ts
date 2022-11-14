import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { EcommerceService } from '../service/ecommerce.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public products:Product[]=[]
  public categories:Category[]=[]
  constructor(
    private ecommerceService: EcommerceService
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct():void{
    this.ecommerceService.getAllProducts().subscribe(
      data => {
        this.products = data
      }
    )
  }

}
