import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Cart } from '../model/cart';
import { Category } from '../model/category';
import { Product, ProductModel } from '../model/product';
import { BuyService } from '../service/buy.service';
import { EcommerceService } from '../service/ecommerce.service';
import { EncryptService } from '../service/encrypt.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public product!: Product;
  public categories: Category[] = [];
  private id!: number;
  public productModel!:ProductModel
  public cart:Cart[]=[];
  private key!:string

  constructor(
    private ecommerceService: EcommerceService,
    private router: Router,
    private route: ActivatedRoute,
    private encryptService:EncryptService,
    private buyService:BuyService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      this.setProductById(this.id);
      console.log(this.id);
    });
  }

  getAllCategories(): void {
    this.ecommerceService.getAllCategory().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  setProductById(id:number){
    this.ecommerceService.getProductById(id).subscribe(
      result => {

        this.productModel = {
          id:result.id,
        category_id : result.category_id,
        name :result.name,
        image : result.image,
        price : result.price,
        description : result.description,
        categoryName : this.assignCategoryName(result.category_id)
        }

        this.productModel.id = result.id;
        this.productModel.category_id = result.category_id;
        this.productModel.name = result.name
        this.productModel.image = result.image
        this.productModel.price = result.price
        this.productModel.description = result.description
        this.productModel.categoryName = this.assignCategoryName(result.category_id)
        console.log(this.productModel);
      }
    )
  }
  assignCategoryName(id:number){
    let name=''
    this.categories.forEach(
      elemen => {
        if(elemen.id == id){
          name = elemen.name
        }
      }
    )
    console.log(this.categories)
    return name;
  }


  buyProduct(id:number){
    this.buyService.buyService(id)
  }

  
}
