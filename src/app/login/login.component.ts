import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AppComponent} from '../app.component';
import {Users} from '../fake-db';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginn = '';
  password = '';
  isRegistering = false;
  isTaken = false;
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack(): void{
    this.location.back();
  }
  login(): void{
    for (const user of Users){
      if (user.name === this.loginn && this.password === user.password){
        this.location.back();
        AppComponent.isLogged = true;
        user.status = true;
      }
    }
  }
  register(): void{
    this.isRegistering = !this.isRegistering;
  }
  registerClicked(): void{
    for (const user of Users){
      if (user.name === this.loginn){
        window.alert('User name already taken');
        this.isTaken = true;
        this.loginn = '';
        this.password = '';
      }
    }
    if (!this.isTaken){
      Users.push({id: Users.length, name: this.loginn, password: this.password, status: false});
      this.isRegistering = false;
    }
  }

}
