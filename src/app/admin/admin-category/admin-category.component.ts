import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { EcommerceService } from 'src/app/service/ecommerce.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {


  public categories:Category[]=[]
  constructor(
    private ecommerceService:EcommerceService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }


  getAllCategories():void{
    this.ecommerceService.getAllCategory().subscribe(
      result => {
        this.categories=result;
        console.log(this.categories)
      }
    )
  }

  deteleCategoryById(id:number):void{
    this.ecommerceService.deleteCategory(id).subscribe(
      result => {
        console.log(result)
      }
    )
    this.ngOnInit();
  }

}
