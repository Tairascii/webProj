import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment} from '../models';
import {Users} from '../fake-db';
import { CartService } from '../cart.service';
import {AppComponent} from '../app.component';
import {CatalogService} from '../catalog.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {id: 0, price: 2, cat: 1, rating: 0, quantity: 10, image: '', description: '', subcat: 1, name: ''};
  comments: Comment[] = [];
  addBClick = false;
  updateBClick = false;
  commentAdd = '';
  commentUpdate = '';
  id = 0;
  prodId = 0;
  currentUserName = localStorage.getItem('userName');
  constructor(private route: ActivatedRoute, private cartService: CartService, private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.getUser();
    this.getProduct();
  }
  getProduct(): void{
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null){
        this.catalogService.getProductDetail(id).subscribe((data) => {
          this.product = data;
        });
        this.catalogService.getComments(id).subscribe((data) => {
          this.comments = data;
        });
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
    if (localStorage.getItem('token')){
      this.addBClick = true;
    }
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
          const comment = new Comment(this.currentUserName as string, id, this.commentAdd);
          comment.date = this.getDate();
          this.catalogService.createComment(id, comment).subscribe((comment) => {
            this.getProduct();
            this.getDate();
            this.addBClick = false;
            this.commentAdd = '';
          });
        }
      });
      // const comment = new Comment(this.currentUserName, this.prodId, this.commentAdd);
      // comment.date = this.getDate();
      // Comments.push(comment);
    }
    else{
      this.addBClick = false;
    }
  }
  deleteB(comment: Comment): void{
    // const ind = Comments.indexOf(id);
    // Comments.splice(ind, 1);
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null){
        this.catalogService.deleteComment(id, comment.id).subscribe((comment) => {
          this.getProduct();
        });
      }
    });
    this.getProduct();
  }
  updateB(comment: Comment): void{
    if (this.commentUpdate !== ''){
      comment.comment = this.commentUpdate;
      comment.date = this.getDate();
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id != null){
          this.catalogService.updateComment(id, comment).subscribe((comment) => {
            this.updateBClick = false;
            this.commentUpdate = '';
            this.getProduct();
          });
        }
      });
    }
    else{
      this.updateBClick = false;
    }
  }
}
