import { Component, Input, OnInit } from '@angular/core';
import {Product} from '../models';
import {CatalogService} from '../catalog.service';
@Component({
  selector: 'app-subcatalog',
  templateUrl: './subcatalog.component.html',
  styleUrls: ['./subcatalog.component.css']
})
export class SubcatalogComponent implements OnInit {
  @Input() currentCategory: number | undefined;
  @Input() currentSubCat: number | undefined;
  loaded: boolean | undefined;
  products: Product[] | undefined;
  constructor(private catalogService: CatalogService) {
  }
  getProduct(): void{
    this.loaded = false;
    this.catalogService.getProducts().subscribe((data) => {
      this.loaded = true;
      this.products = data;
    });
  }
  getProd(){
    if (this.currentCategory === 5){
      return this.products;
    }
    if (this.currentSubCat === 0 && this.products){
      return this.products.filter((x) => x.cat === this.currentCategory);
    }
    if (this.products){
      return this.products.filter((x) => x.cat === this.currentCategory && x.subcat === this.currentSubCat);
    }
    return [];
  }
  ngOnInit(): void {
    this.getProduct();
  }

}
