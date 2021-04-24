import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment} from '../models';
import {Products, Comments, Users} from '../fake-db';
import { CartService } from '../cart.service';
import {AppComponent} from '../app.component';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product = Products[0];
  comments = Comments;
  addBClick = false;
  updateBClick = false;
  commentAdd = '';
  commentUpdate = '';
  id = 0;
  prodId = 0;
  currentUserName = '';
  constructor(private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.getUser();
    this.getProduct();
  }
  getProduct(): void{
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null){
        this.product = Products.filter((x) => x.id === +id)[0];
        this.comments = Comments.filter((x) => x.productId === +id);
      }
    });
  }
  getDate(): string{
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
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
  addB(): void{
    this.addBClick = true;
  }
  editB(id: number): void{
    this.id = id;
    this.updateBClick = true;
  }
  getUser(): void{
    for (const user of Users){
      if (user.status){
        this.currentUserName = user.name;
        break;
      }
    }
  }
  newComment(): void{
      if (this.commentAdd !== ''){
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id != null){
          this.prodId = +id;
        }
      });
      const comment = new Comment(this.currentUserName, this.prodId, this.commentAdd);
      comment.date = this.getDate();
      Comments.push(comment);
      this.getProduct();
      this.getDate();
      this.addBClick = false;
      this.commentAdd = '';
    }
    else{
      this.addBClick = false;
    }
  }
  deleteB(id: Comment): void{
    const ind = Comments.indexOf(id);
    Comments.splice(ind, 1);
    this.getProduct();
  }
  updateB(id: Comment): void{
    if (this.commentUpdate !== ''){
      id.comment = this.commentUpdate;
      id.date = this.getDate();
      this.updateBClick = false;
      this.commentUpdate = '';
      this.getProduct();
    }
    else{
      this.updateBClick = false;
    }
  }
}
