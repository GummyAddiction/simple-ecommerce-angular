import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { EcommerceService } from 'src/app/service/ecommerce.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {


  public users:User[]=[]

  constructor(
    private ecommerceService:EcommerceService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers():void{
    this.ecommerceService.getAllUsers().subscribe(
      result => {
        this.users = result;
        console.log(this.users)
      }
    )
  }


  deleteUserById(id:number):void{
    this.ecommerceService.deleteUser(id).subscribe(
      result => {
        console.log(result)
      }
    )
    this.ngOnInit();
  }

}
