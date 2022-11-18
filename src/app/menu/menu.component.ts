import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { EcommerceService } from '../service/ecommerce.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  public url!:string

  isLoggedIn$!: Observable<boolean>;

  public categories:Category[]=[];
  @Input() badges?:number

  constructor(
    private ecommerceService:EcommerceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.url = this.router.url
    this.isLoggedIn$ = this.ecommerceService.isLoggedIn;
    console.log('cek url')
    console.log(this.url);
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


  onLogout() {
    this.ecommerceService.logout();
  }
}
