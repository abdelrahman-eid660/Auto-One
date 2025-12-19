import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { NgClass, NgIf } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-wishlist',
  imports: [NgClass, NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  colClass: string = 'col-md-3';
  wishListData = JSON.parse(localStorage.getItem('favourites') || '[]');
  favouritProducts!: any;
  favouritProductsFilter!: any;
  isFav: boolean = false;
  // quickLook and compare
  quicklook: boolean = false;
  // modelData
  modelData!: any;
  constructor(
    private productServ: ProductsService,
    private cartServ: CartService,
    private router: Router
  ) {
    this.getData();
  }
  getData() {
    this.productServ.get().subscribe((data) => {
      this.favouritProducts = data;
      this.favouritProducts = this.favouritProducts.map((item: any) => ({
        ...item,
        quntity: 1,
      }));
      this.favouritProductsFilter = this.favouritProducts.filter((fav: any) => {
        return this.wishListData.includes(fav.id);
      });
    });
  }
  remove(id: number) {
    this.favouritProductsFilter.splice(id, 1);
    localStorage.setItem(
      'favourites',
      JSON.stringify(this.favouritProductsFilter)
    );
    const fav = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (fav.length === 0) {
      window.location.reload();
    }
  }
  compareBtn(item?: any) {
    const compareProducts = JSON.parse(
      localStorage.getItem('compareProducts') ?? '[]'
    );
    const index = compareProducts.findIndex(
      (product: any) => product.id == item.id
    );
    if (index > -1) {
      alert('هذا المنتج مضاف بالفعل للمقارنة');
      return;
    }
    compareProducts.push(item);
    setTimeout(() => {
      const compareModal = document.getElementById('compareModal');
      if (compareModal) {
        const modal = new bootstrap.Modal(compareModal);
        modal.show();
        window.addEventListener('click', (e) => {
          if (e.target) {
            modal.hide();
          }
        });
      }
    }, 100);
    this.router.navigateByUrl('/user/product-compare');
    localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
  }

  favouritBtn(item?: any) {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    const index = favourites.indexOf(item.id);
    if (index > -1) {
      favourites.splice(index, 1);
    }
    favourites.push(item.id);
    setTimeout(() => {
      const modalEl = document.getElementById('wishlistModal');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
        window.addEventListener('click', (e) => {
          if (e.target) {
            modal.hide();
          }
        });
      }
    }, 100);

    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
  isFavourite(item?: any): boolean {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    this.isFav = !this.isFav;
    return favourites.includes(item.id);
  }
  showModel(id?: any) {
    this.quicklook = !this.quicklook;
    this.productServ.getById(id).subscribe((data: any) => {
      this.modelData = {
        ...data,
        quntity: 1,
        totalPrice: data.price,
      };
    });
  }
  increase() {
    if (this.modelData.quntity < this.modelData.count) {
      this.modelData.quntity++;
      this.totalPrice(this.modelData.quntity);
    }
  }
  decrease() {
    if (this.modelData.quntity > 1) {
      this.modelData.quntity--;
      this.totalPrice(this.modelData.quntity);
    }
  }
  totalPrice(quntity: number) {
    this.modelData.totalPrice = quntity * this.modelData.price;
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
