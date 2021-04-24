import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from './models';
import {Products} from './fake-db';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  dict = new Map<number, number>();
  constructor(private http: HttpClient) {
  }
  addToCart(product: Product): void {
    this.items.push(product);
  }
  getItems(): Product[] {
    return this.items;
  }
  isIn(product: Product): boolean{
    if (this.items.filter((x) => x === product).length > 0){
      return true;
    }
    return false;
  }
  clearCart(): Product[]{
    this.dict.clear();
    this.items = [];
    return this.items;
  }
  deleteItem(itemId: number): void{
    this.items = this.items.filter((x) => x.id !== itemId);
  }
  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }
}
