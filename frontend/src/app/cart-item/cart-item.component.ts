import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../models';
import {CartComponent} from '../cart/cart.component';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() currentItem: Product | undefined;
  // @Output() cartValue: EventEmitter<number> = new EventEmitter<number>();
  @Output() remove = new EventEmitter();
  @Output() price = new EventEmitter();
  quantityty: number;
  // price: number | undefined;
  constructor(private cartService: CartService) {
    this.quantityty = 1;
    if (this.currentItem){

    }
  }

  ngOnInit(): void {
    this.changePrice();
  }
  deleteItem(itemId: number): void{
    this.remove.emit(itemId);
  }
  changePrice(): void{
    if (this.currentItem){
      const valuee = this.quantityty * this.getPrice();
      this.cartService.dict.set(this.currentItem.id, valuee);
      this.price.emit(this.cartService.dict);
    }
  }
  getPrice(): number{
    var z = 0;
    if (this.currentItem){
      z = +((this.currentItem.price * 430).toFixed(1));
    }
    return z;
  }

}
