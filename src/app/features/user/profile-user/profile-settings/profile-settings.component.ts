import { PurchaseService } from './../../../../core/services/purchase.service';
import { Component } from '@angular/core';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
import { CustomersService } from '../../../../core/services/customers.service';
import { OrderProductsService } from '../../../../core/services/order-products.service';
import { UsersService } from '../../../../core/services/users.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-profile-settings',
  imports: [],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css',
})
export class ProfileSettingsComponent {
  customerData!: any;
  orderData!: any;
  subscriptionData!: any;
  UsersubscriptionData!: any;
  purchaseData!: any;
  userData: any = [];
  constructor(
    private subscriptionServ: SubscriptionsService,
    private custmoerServ: CustomersService,
    private orderProduct: OrderProductsService,
    private userServ: UsersService,
    private PurchaseServ: PurchaseService
  ) {
    this.loadData();
  }
  loadData() {
    const userData = localStorage.getItem('user');
    const myAccount = userData ? JSON.parse(userData) : null;
    forkJoin({
      user: this.userServ.get(),
      subscritpion: this.subscriptionServ.get(),
      order: this.orderProduct.get(),
      customer: this.custmoerServ.get(),
      purchase: this.PurchaseServ.get(),
    }).subscribe((data: any) => {
      this.customerData = data.customer.find((em: any) => {
        return em.email == myAccount.email;
      });
      this.userData = data.user.find((em: any) => {
        return em.email == myAccount.email;
      });
      this.orderData = data.order.filter((em: any) => {
        return em.email == myAccount.email;
      });
      this.subscriptionData = data.subscritpion.find((em: any) => {
        return em.email == myAccount.email;
      });
      this.purchaseData = data.purchase.filter((p: any) => {
        return p.email === myAccount.email;
      });
    });
  }
  changeLangue() {
    alert('قريباا😊✅');
  }
  deleteMyAccount() {
    if (!this.userData || !this.userData.id) return;
    if (
      !confirm('هل أنت متأكد من حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه!')
    ) {
      return;
    }
    try {
      if (this.subscriptionData?.id) {
        this.subscriptionServ
          .delete(this.subscriptionData.id)
          .subscribe((data) => {});
      }
      if (this.customerData?.id) {
        this.custmoerServ.delete(this.customerData.id).subscribe((data) => {});
      }
      if (this.orderData?.id) {
        this.orderProduct.delete(this.orderData.id).subscribe((data) => {});
      }
      if (this.userData?.id) {
        this.userServ.delete(this.userData.id).subscribe((data) => {});
      }
      if (this.purchaseData?.length) {
        this.purchaseData.forEach((order: any) => {
          this.PurchaseServ.delete(order.id).subscribe((data) => {});
        });
      }
      if (this.orderData?.length) {
        this.orderData.forEach((order: any) => {
          this.orderProduct.delete(order.id).subscribe((data) => {});
        });
      }
      localStorage.removeItem('user');
      alert('تم حذف حسابك بنجاح');
      window.location.href = '/';
    } catch (error) {
      console.log(error);

      alert('حدث خطأ غير متوقع');
    }
  }
}
