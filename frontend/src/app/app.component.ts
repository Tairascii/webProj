import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from './cart.service';
import {Users} from './fake-db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  static isLogged: boolean;
  title = 'project';
  constructor(public router: Router) {
    AppComponent.isLogged = false;
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token){
      AppComponent.isLogged = true;
    }
  }

  get isLogged(): boolean{
    return AppComponent.isLogged;
  }
  logout(): void{
    // for (const user of Users){
    //   if (user.status){
    //     user.status = false;
    //   }
    // }
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    AppComponent.isLogged = false;

  }
}
