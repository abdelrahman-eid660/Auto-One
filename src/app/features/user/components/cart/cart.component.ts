import { DecimalPipe, NgFor } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { AdminModule } from '../../../admin/admin.routes.module';
import { CartService } from '../../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { PurchaseService } from '../../../../core/services/purchase.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-cart',
  imports: [DecimalPipe, AdminModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  allData: any[] = [];
  copuonValue: string = '';
  constructor(
    private cartServ: CartService,
    private toster: ToastrService,
    private purchaseServ: PurchaseService,
    private router: Router
  ) {
    this.getData();
  }
  getData() {
    this.cartServ.get().subscribe((data: any) => {
      this.allData = data;
      console.log(this.allData);
    });
  }

  increaseQuantity(item: any) {
    item.quntity++;
    item.total = +item.price * +item.quntity;
  }

  decreaseQuantity(item: any) {
    if (item.quntity > 1) {
      item.quntity--;
      item.total = +item.price * +item.quntity;
    }
  }

  removeItem(itemId: number) {
    this.cartServ.delete(itemId).subscribe((data: any) => {});
    this.purchaseServ
      .delete(this.getOrCreateOrderId())
      .subscribe((data: any) => {});
    this.toster.success('', 'تم ازاله المنتج من سله المشتريات', {
      timeOut: 500,
    });
    setTimeout(() => {
      window.location.reload();
    }, 510);
  }
  copuonInput(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.copuonValue = value;
  }
  copuon() {
    if (this.copuonValue.trim() !== '') {
      this.allData.forEach((item: any) => {
        const basePrice = +item.price * +item.quntity;
        item.discount = +basePrice * 0.05;
        item.total = +basePrice - +item.discount;
      });
      this.toster.success('', 'تم تطبيق كود الخصم بنجاح', {
        timeOut: 1200,
      });
    }
  }

  get subtotal() {
    return this.allData.reduce((sum, item) => sum + item.total, 0);
  }

  get tax() {
    return this.subtotal * 0.14;
  }

  get totalPrice() {
    return this.subtotal + this.tax;
  }
  purchase(allItems: any[]) {
    const user = localStorage.getItem('user');
    if (!user) {
      const modalElem = document.getElementById('loginRequiredModal');
      const modal = new bootstrap.Modal(modalElem!);
      modal.show();
      document.body.addEventListener(
        'click',
        () => {
          modal.hide();
        },
        { once: true }
      );

      return;
    }
    if (!allItems || allItems.length === 0) {
      this.toster.warning('', 'سلة المشتريات فارغة', {
        timeOut: 1200,
      });
      return;
    }
    const UserData = localStorage.getItem('user');
    const users = UserData ? JSON.parse(UserData) : null;
    const orderId = this.getOrCreateOrderId();

    const orderData = {
      id: orderId,
      email: users.email,
      items: allItems,
      total: this.totalPrice,
    };

    this.purchaseServ.put(orderData, orderData.id).subscribe({
      next: (response: any) => {
        this.router.navigateByUrl('/user/cart/checkout');
      },
      error: (error) => {
        if (error.status === 404) {
          this.createNewOrder(allItems);
        }
      },
    });
  }
  goToLogin() {
    window.location.href = '/user/login';
  }

  goToRegister() {
    window.location.href = '/user/signup';
  }

  private getOrCreateOrderId(): string {
    let orderId = localStorage.getItem('currentOrderId');

    if (!orderId) {
      orderId = 'order_' + Date.now();
      localStorage.setItem('currentOrderId', orderId);
    }

    return orderId;
  }
  private createNewOrder(items: any[]) {
    const UserData = localStorage.getItem('user');
    const users = UserData ? JSON.parse(UserData) : null;
    const orderId = this.getOrCreateOrderId();

    const newOrder = {
      id: orderId,
      email: users.email,
      items: items,
      status: 'pending',
      createdAt: new Date().toISOString(),
      total: this.totalPrice,
    };

    this.purchaseServ.post(newOrder).subscribe({
      next: (response: any) => {
        this.router.navigateByUrl('/user/cart/checkout');
      },
      error: (error) => {},
    });
  }

  private isLocalDuplicate(obj: any): boolean {
    return this.allData.some(
      (item) => item.id === obj.id && item.quntity === obj.quntity
    );
  }

  private addToPurchase(obj: any) {
    this.purchaseServ.post(obj).subscribe({
      next: (response: any) => {
        this.toster.success('', 'تم إضافة المنتج إلى الطلب', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/user/cart/checkout');
      },
      error: (error) => {
        this.toster.error('', 'حدث خطأ في إضافة المنتج', {
          timeOut: 1200,
        });
      },
    });
  }
}
