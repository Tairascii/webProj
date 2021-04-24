import { Component, OnInit, Output } from '@angular/core';
import {Subcats, Cats} from '../fake-db';
import {SubCategory, Category} from '../models';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  currentCategory = 0;
  currentSubCat = 0;
  medicines: SubCategory[];
  vitamins: SubCategory[];
  skin: SubCategory[];
  baby: SubCategory[];
  cats: Category[];
  all: SubCategory[];
  constructor(){
    this.cats = Cats;
    this.all = [];
    this.medicines = Subcats.filter((x) => x.cat === 1);
    this.vitamins = Subcats.filter((x) => x.cat === 2);
    this.skin = Subcats.filter((x) => x.cat === 3);
    this.baby = Subcats.filter((x) => x.cat === 4);
  }

  ngOnInit(): void {
    this.currentCategory = 0;
  }
  setSubCatalog(num: number, cat: number): void{
    this.currentCategory = cat;
    this.currentSubCat = num;
  }
  setCategory(num: number): void {
    this.currentSubCat = 0;
    this.currentCategory = num;
  }
  getSubCat(id: number): SubCategory[]{
    if (id === 0){
      return this.all;
    }
    if (id === 1) {
      return this.medicines;
    }
    else if (id === 2) {
      return this.vitamins;
    }
    else if (id === 3) {
      return this.skin;
    }
    else if (id === 4) {
      return this.baby;
    }
    return this.medicines;
  }

}
