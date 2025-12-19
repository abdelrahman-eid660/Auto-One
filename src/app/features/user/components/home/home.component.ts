import { map } from 'rxjs/operators';
import { state } from '@angular/animations';
import { NgClass, NgFor, NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../../core/services/products.service';
import { CartService } from '../../../../core/services/cart.service';
import { ViewEncapsulation } from '@angular/core';
import { ServiceService } from '../../../../core/services/service.service';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  imports: [RouterLink, CarouselModule, NgClass, NgIf, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None, // ده بيسمح للـ CSS يطبّق على العناصر اللي جوه المكتبة.
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true, // لتكرار الـ carousel بلا حدود
    autoplay: false, // لتشغيل التمرير تلقائيًا
    autoplayTimeout: 3000, // الوقت بين كل شريحة (3 ثواني)
    autoplayHoverPause: true, // يوقف التمرير لو الماوس فوق الشريحة
    dots: true, // النقاط أسفل الـ carousel
    nav: true, // أسهم التنقل
    navText: [
      '<i class="fa-solid fa-angle-left"></i>',
      '<i class="fa-solid fa-angle-right"></i>',
    ], // تصميم الأسهم
    margin: 10,
    responsive: {
      0: { items: 1 }, // شاشة صغيرة (موبايل) تظهر عنصر واحد
      576: { items: 2 }, // شاشات صغيرة أكبر قليلًا تظهر عنصرين
      768: { items: 3 }, // تابلت يظهر 3 عناصر
      992: { items: 4 }, // ديسكتوب متوسط يظهر 4 عناصر (متوافق مع col-md-3)
      1200: { items: 4 }, // ديسكتوب كبير يظهر 4 عناصر
    },
  };
  categoryOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    nav: true,
    navText: [
      '<i class="fa-solid fa-angle-left"></i>',
      '<i class="fa-solid fa-angle-right"></i>',
    ],
    margin: 10,
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 1 },
      992: { items: 1 },
      1200: { items: 1 },
    },
  };
  aboutBrandsOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    nav: true,
    navText: [
      '<i class="fa-solid fa-angle-left"></i>',
      '<i class="fa-solid fa-angle-right"></i>',
    ],
    margin: 10,
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 1 },
      992: { items: 1 },
      1200: { items: 1 },
    },
  };
  aboutBrands: any[] = [
    {
      id: 1,
      desc: 'لقد كنت زبونًا مخلصًا قطع غيار السيارات  لسنوات الآن. مجموعة منتجاتهم الواسعة، خدمة العملاء الممتازة، والشحن السريع لم تفشل أبدًا في إبهاري.',
    },
    {
      id: 2,
      desc: 'لقد كنت زبونًا مخلصًا قطع غيار السيارات  لسنوات الآن. مجموعة منتجاتهم الواسعة، خدمة العملاء الممتازة، والشحن السريع لم تفشل أبدًا في إبهاري.',
    },
    {
      id: 3,
      desc: 'لقد كنت زبونًا مخلصًا قطع غيار السيارات  لسنوات الآن. مجموعة منتجاتهم الواسعة، خدمة العملاء الممتازة، والشحن السريع لم تفشل أبدًا في إبهاري.',
    },
  ];
  // get data from api
  aboutcover!: any;
  productsData!: any;
  serviceProduct: any[] = [];
  mostProducts!: any;
  categoryProducts!: any;
  discountProducts!: any;
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
    private serviceServ: ServiceService,
    private router : Router
  ) {
    this.getData();
  }
  getData() {
    this.productServ.get().subscribe((data) => {
      this.productsData = data;
      this.aboutcover = this.productsData
        .filter((car: any) => {
          return car.code == 'Bmw-101';
        })
        .map((img: any) => {
          return img.image;
        })
        .join('');

      this.serviceServ.get().subscribe((serv: any) => {
        this.serviceProduct = serv.slice(0, 4);
      });
      this.mostProducts = this.productsData.slice(0, 8);
      this.categoryProducts = this.productsData.slice(0, 4);
      this.discountProducts = this.productsData.filter((item: any) => {
        return item.category === 'special-spare-parts';
      });
    });
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
    this.productServ.getById(id).subscribe((data) => {
      this.modelData = data;
    });
  }
  increase() {
    this.modelData.quntity++;
    this.totalPrice(this.modelData.quntity);
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
    this.cartServ.post({...item, total : item.price * item.quntity}).subscribe((data: any) => {
      this.router.navigateByUrl('/user/cart')
    });
  }
}
