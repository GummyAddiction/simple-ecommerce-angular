import { KeyedRead } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart';
import { EncryptService } from '../service/encrypt.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private key:string = 'cart'
  public cart:Cart[]=[]
  public grandTotal:number=0;
  constructor(
    private enctyptService:EncryptService
  ) { }

  ngOnInit(): void {
    this.getAllCartItem();
  }


  getAllCartItem(){
    this.cart = JSON.parse(this.enctyptService.getData(this.key))
    this.getGrandTotal()
    console.log(this.cart)
  }

  getGrandTotal(){
    this.cart.forEach(
      elemen => {
        this.grandTotal = this.grandTotal + elemen.total
      }
    )
  }

  deleteItem(id:number){
    let cart:Cart[]=[]
    this.cart.forEach(
        elemen=>{
          if(elemen.productId != id){
            cart.push(elemen)
          }
        }
    )
    this.cart = cart;
    this.getGrandTotal();
    this.enctyptService.saveData(this.key, JSON.stringify(this.cart))
    window.location.reload();
  }

}
