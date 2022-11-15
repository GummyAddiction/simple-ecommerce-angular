import { R3BoundTarget } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { EcommerceService } from 'src/app/service/ecommerce.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  public products:Product[]=[]
  public category:Category[]=[]

  constructor(
    private ecommerceService: EcommerceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }


  getAllProducts():void{
    this.ecommerceService.getAllProducts().subscribe(
      data => {
        this.products = data;
        console.log(this.products)
      }
    )
  }


  deleteProduct(id:number):void{
    this.ecommerceService.deleteProduct(id).subscribe(
      result => console.log(result)
    )
    this.ngOnInit();
  }

  onEdit(id:number){
    this.router.navigate(['admin/product/form', id])
  }


  getCategoryNameById(id:number){
    // let name:string = ''
    // this.ecommerceService.getCategoryById(id).subscribe(
    //   result => { name = result.name
    //     console.log(result.name)
    //     return name;
    //   }
    // )
    // return name;
  }



  

}
