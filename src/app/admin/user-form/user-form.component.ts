import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/service/ecommerce.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public userForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),

  });

  constructor(private ecommerceService: EcommerceService,
    private router:Router) {}

  ngOnInit(): void {
  }


  addUser():void{
    this.ecommerceService.addUser(this.userForm.value).subscribe(
      result => {
        console.log(result)
      }
    )
  }

  onSubmit():void{
    this.addUser();
    this.router.navigate(['admin/user']);
  }

  onDiscard():void{
    this.router.navigate(['admin/user']);
  }

}
