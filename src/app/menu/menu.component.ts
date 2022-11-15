import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { EcommerceService } from '../service/ecommerce.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  

  public categories:Category[]=[];

  constructor(
    private ecommerceService:EcommerceService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }



  getAllCategories():void{
    this.ecommerceService.getAllCategory().subscribe(
      value => {
        this.categories = value
        console.log(this.categories)
      }
    )
  }


  shopClick():void{
    console.log('shop button clicked')
  }
}
