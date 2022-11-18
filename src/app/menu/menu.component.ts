import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { EcommerceService } from '../service/ecommerce.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  

  public categories:Category[]=[];
  @Input() badges?:number

  constructor(
    private ecommerceService:EcommerceService,
    private router:Router
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

  categoryClick(id:number){
    this.router.navigate(['/shop', id])
  }
}
