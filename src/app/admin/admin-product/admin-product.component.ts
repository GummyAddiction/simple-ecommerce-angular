import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { R3BoundTarget } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Product, ProductModel } from 'src/app/model/product';
import { EcommerceService } from 'src/app/service/ecommerce.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  public products:Product[]=[]
  public categories:Category[]=[]
  public productModel:ProductModel[]=[]

  constructor(
    private ecommerceService: EcommerceService,
    private router:Router,
    
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories(){
    this.ecommerceService.getAllCategory().subscribe(
      result => {
        this.categories = result;
        console.log(this.categories)
        this.getAllProducts()
      }
    )
  }

  getAllProducts(){
    this.ecommerceService.getAllProducts().subscribe(
      result => {
        this.productModel = result;
        console.log(this.productModel);
        this.productModel.forEach(
          elemen=> {
            elemen.categoryName =  this.assignCategoryName(elemen.category_id)
            console.log(elemen.categoryName)
          }
        )
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




  deleteProduct(id:number):void{
    this.ecommerceService.deleteProduct(id).subscribe(
      result => console.log(result)
    )
    
    console.log('delete product')
    window.location.reload();
  }

  onEdit(id:number){
    this.router.navigate(['admin/product/form', id])
  }

}
