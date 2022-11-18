import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginmodel } from '../model/loginmodel';
import { EcommerceService } from '../service/ecommerce.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel:loginmodel = new loginmodel();
  constructor(private ecommerceService: EcommerceService,
    private router:Router) {}

  ngOnInit(): void {}
  username: string = '';
  password: string = '';
  map: Map<string, string> = new Map;
  show: boolean = false;
  submit() {
    this.loginModel.username = this.username;
    this.loginModel.password = this.password;
    this.ecommerceService.login(this.loginModel).subscribe(res =>{
      console.log(res);
      if(res.role != ''){
        alert("berhasil login");
        this.saveSession(res.role);
        this.ecommerceService.isLoggedIn.subscribe(
          value => {
            value = true
          }
        )
        this.router.navigate(['']);
      }
      else{
        // console.log(localStorage.getItem('username'));
        alert("Username atau password salah!");
      }
    });
  }
  clear() {
    this.username = '';
    this.password = '';
    this.show = true;
  }

  saveSession(res:string){
    localStorage.setItem('username',this.username);
    localStorage.setItem('password',this.password);
    localStorage.setItem('role',res);
  }
}
