import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;
  quantity = 1;
  quantityInBasket = 0;
  // buttonText = 'Add to basket';

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService, private basketService: BasketService) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.shopService.getProduct(+id).subscribe({
      next: res => {
        this.product = res;
        this.bcService.set('@productDetails', res.name);
        this.loadBasketInfo(+id);
      },
      error: res => console.log(res),
    });
  }

  private loadBasketInfo(id: number) {
    this.basketService.basketSource$.pipe(take(1)).subscribe({
      next: basket => {
        const item = basket?.items.find(x => x.id === id);
        if (item) {
          this.quantity = this.quantityInBasket = item.quantity;
        }
      }
    });
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {

    this.quantity--;

    if (this.quantityInBasket > 0) {
      if (this.quantity < 1)
        this.quantity = 0;
    }
    else {
      if (this.quantity < 2)
        this.quantity = 1;
    }
  }

  updateBasket() {
    if (this.product) {
      if (this.quantityInBasket > 0 && this.quantity === 0) {
        this.basketService.removeItemFromBasket(this.product.id,
          this.quantityInBasket);

      }
      else {
        this.basketService.addItemToBasket(
          this.product, this.quantity - this.quantityInBasket);
      }

      this.quantityInBasket = this.quantity

      if (this.quantityInBasket < 1)
        this.quantity = 1;
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket'
  }





}
