import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { CartService } from '../../../../core/services/cart.service';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-compare',
  imports: [NgFor, NgIf],
  templateUrl: './product-compare.component.html',
  styleUrl: './product-compare.component.css',
})
export class ProductCompareComponent {
  compareProductsData = JSON.parse(
    localStorage.getItem('compareProducts') || '[]'
  );
  compareProducts!: any;
  constructor(
    private productServ: ProductsService,
    private cartServ: CartService,
    private toster: ToastrService,
    private router: Router
  ) {
    this.getData();
  }
  getData() {
    this.productServ.get().subscribe((data) => {
      this.compareProducts = data;
      this.compareProducts = this.compareProducts.map((item: any) => ({
        ...item,
        quntity: 1,
      }));
    });
  }
  remove(id: number) {
    this.compareProductsData.splice(id, 1);
    localStorage.setItem(
      'compareProducts',
      JSON.stringify(this.compareProductsData)
    );
    const prod = JSON.parse(localStorage.getItem('compareProducts') || '[]');
    if (prod.length === 0) {
      window.location.reload();
    }
  }
  cart(item: any) {
    const cartItem = {
      ...item,
      quntity: item.quntity || 1,
      total: (item.quntity || 1) * item.price,
    };

    this.cartServ.post(cartItem).subscribe(() => {
      this.router.navigateByUrl('/user/cart');
    });
  }
}
