import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../models';
import {newArray} from '@angular/compiler/src/util';
import {AppComponent} from '../app.component';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() currentProduct: Product | undefined;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }
  addToCart(product: Product): void {
    if (AppComponent.isLogged === true){
      if (this.cartService.isIn(product)){
        window.alert('Already in cart!');
      }
      else{
        this.cartService.addToCart(product);
      }
    }
    else{
      window.alert('please, login');
    }
  }

}
