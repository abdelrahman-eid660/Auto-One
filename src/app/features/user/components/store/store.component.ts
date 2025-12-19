import { ProductsUpdateComponent } from './../../../admin/components/products/products-update/products-update.component';
import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
declare var bootstrap: any;
@Component({
  selector: 'app-store',
  imports: [NgClass, RouterLink, NgIf],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent {
  // get data from api
  productsData!: any;
  productsDataFilter!: any;
  // change show of products
  colClass: String = 'col-md-3';
  //fav
  isFav: boolean = false;
  // pagination
  currentPage: number = 1;
  itemPerPage: number = 8;
  totalPages: number = 0;
  // quickLook and compare
  quicklook: boolean = false;
  //counter
  countOfProduct: any = 1;
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
    this.productServ.get().subscribe((data: any) => {
      this.productsData = data.map((item: any) => ({
        ...item,
        quntity: 1,
      }));
      this.showData(8, 'col-md-3');
      this.totalPages = Math.ceil(this.productsData.length / this.itemPerPage);
      this.getPagnation();
    });
  }

  getPagnation() {
    const startIndex = (this.currentPage - 1) * this.itemPerPage;
    const endIndex = startIndex + this.itemPerPage;
    this.productsDataFilter = this.productsData.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPagnation();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPagnation();
    }
  }
  sortProducts(event: any) {
    const value = event.target.value;

    switch (value) {
      case 'az':
        this.productsData.sort((a: any, b: any) =>
          a.name.localeCompare(b.name, 'ar')
        );
        break;

      case 'za':
        this.productsData.sort((a: any, b: any) =>
          b.name.localeCompare(a.name, 'ar')
        );
        break;

      case 'priceLow':
        this.productsData.sort((a: any, b: any) => a.price - b.price);
        break;

      case 'priceHigh':
        this.productsData.sort((a: any, b: any) => b.price - a.price);
        break;

      case 'discountHigh':
        this.productsData.sort(
          (a: any, b: any) => (b.discount || 0) - (a.discount || 0)
        );
        break;

      case 'discountLow':
        this.productsData.sort(
          (a: any, b: any) => (a.discount || 0) - (b.discount || 0)
        );
        break;

      default:
        this.getData();
        return;
    }
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.productsData.length / this.itemPerPage);
    this.getPagnation();
  }
  changeItemPerPage(count?: number, event?: any) {
    this.itemPerPage = count || parseInt(event.target.value);
    this.totalPages = Math.ceil(this.productsData.length / this.itemPerPage);
    this.getPagnation();
  }
  showData(count: any, Col: string) {
    this.productsDataFilter = this.productsData.slice(0, count);
    this.colClass = Col;
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

    localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
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
