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

export class ShopComponent implements OnInit {

  @ViewChild('search') SearchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];

  shopParams: ShopParams;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' }
  ]

  totalCount = 0;

  constructor(private shopService: ShopService) {
    this.shopParams = shopService.shopParams;
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: res => {
        this.products = res.data;
        this.totalCount = res.count;
      },
      error: error => console.log(error),
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: res => this.brands = [{ id: 0, name: 'All brands' }, ...res],
      error: error => console.log(error),
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: res => this.types = [{ id: 0, name: 'All types' }, ...res],
      error: error => console.log(error),
    });
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.pageNumber = 1
    params.brandId = brandId;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.pageNumber = 1
    params.typeId = typeId;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onSortSelected(event: any) {
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(event: number) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }

  onSearch() {
    // ViewChild Method+
    const params = this.shopService.getShopParams();
    params.search = this.SearchTerm?.nativeElement.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onReset() {
    if (this.SearchTerm) this.SearchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }

}
