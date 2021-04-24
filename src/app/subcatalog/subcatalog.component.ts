import { Component, Input, OnInit } from '@angular/core';
import {Products} from '../fake-db';
import {Product} from '../models';
@Component({
  selector: 'app-subcatalog',
  templateUrl: './subcatalog.component.html',
  styleUrls: ['./subcatalog.component.css']
})
export class SubcatalogComponent implements OnInit {
  @Input() currentCategory: number | undefined;
  @Input() currentSubCat: number | undefined;
  constructor() {
  }
  getProduct(){
    if (this.currentCategory === 0){
      return Products;
    }
    if (this.currentSubCat === 0){
      return Products.filter((x) => x.cat === this.currentCategory);
    }
    return Products.filter((x) => x.cat === this.currentCategory && x.subcat === this.currentSubCat);
  }
  ngOnInit(): void {
  }

}
