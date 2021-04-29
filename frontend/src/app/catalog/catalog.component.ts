import { Component, OnInit, Output } from '@angular/core';
import {SubCategory, Category} from '../models';
import {CatalogService} from '../catalog.service';
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
  constructor(private catalogService: CatalogService){
    // this.cats = Cats;
    this.cats = [];
    this.medicines = [];
    this.vitamins = [];
    this.skin = [];
    this.baby = [];
    this.all = [];
    this.catalogService.getCategories().subscribe((data) => {
      this.cats = data;

    });
    this.catalogService.getSubCategories(1).subscribe((data) => {
      this.medicines = data;

    });
    this.catalogService.getSubCategories(2).subscribe((data) => {
      this.vitamins  = data;
    });
    this.catalogService.getSubCategories(3).subscribe((data) => {
      this.skin = data;
    });
    this.catalogService.getSubCategories(4).subscribe((data) => {
      this.baby = data;
    });
    // this.medicines = Subcats.filter((x) => x.cat === 1);
    // this.vitamins = Subcats.filter((x) => x.cat === 2);
    // this.skin = Subcats.filter((x) => x.cat === 3);
    // this.baby = Subcats.filter((x) => x.cat === 4);
  }

  ngOnInit(): void {
    this.currentCategory = 5;
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
    if (id === 5){
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
