import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit{

  @ViewChild('search') SearchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];

  shopParams = new ShopParams ();

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'}
  ]

  totalCount = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: res => {
        this.products = res.data;
        this.shopParams.pageNumber = res.pageIndex;
        this.shopParams.pageSize = res.pageSize;
        this.totalCount = res.count;
      },
      error: error => console.log(error),
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: res => this.brands = [{id: 0, name: 'All brands'}, ...res],
      error: error => console.log(error),
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: res => this.types = [{id: 0, name: 'All types'}, ...res],
      error: error => console.log(error),
    });
  }

  onBrandSelected(brandId: number){
    this.shopParams.pageNumber = 1
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.pageNumber = 1
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(event: any){
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: number){
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    // ViewChild Method
    this.shopParams.search = this.SearchTerm?.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    if(this.SearchTerm) this.SearchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
