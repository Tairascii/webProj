import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {Products} from '../fake-db';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  totalSum = 0;
  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }
  update(): void {
    this.items = this.cartService.getItems();
  }
  onRemoveItem(itemId: number): void{
    this.cartService.deleteItem(itemId);
    this.cartService.dict.delete(itemId);
    this.total(this.cartService.dict);
    this.update();
    // Products.filter(x => x.id === itemId);
  }
  getTotal(): number{
    return this.totalSum;
  }
  total(dict: Map<number, number>): void{
    this.totalSum = 0;
    for (let value of dict.values()) {
      this.totalSum += value;
    }
  }
  clearCart(){
    this.cartService.clearCart();
    this.total(this.cartService.dict);
    this.update();
  }

}
