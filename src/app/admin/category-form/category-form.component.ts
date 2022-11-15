import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/service/ecommerce.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {


  public categoryForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
  });
  constructor(
    private router:Router,
    private ecommerceService: EcommerceService
  ) { }

  ngOnInit(): void {
  }


  addCategory():void{
    this.ecommerceService.addCategory(this.categoryForm.value).subscribe(
      result => {
        console.log(result)
      }
    )
  }


  onSubmit():void{
    this.addCategory();
    this.router.navigate(['admin/category'])
  }

  onDiscard():void{
    this.router.navigate(['admin/category'])
  }






}
