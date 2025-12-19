import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
import { StatusTranslatePipe } from '../../../../core/pipe/status-translate.pipe';
import { CustomersService } from '../../../../core/services/customers.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-mysubsription',
  imports: [StatusTranslatePipe, RouterLink],
  templateUrl: './profile-mysubsription.component.html',
  styleUrl: './profile-mysubsription.component.css',
})
export class ProfileMysubsriptionComponent {
  userSubscription: any = [];
  isLoading: boolean = true;
  constructor(
    private SubsriptionServ: SubscriptionsService,
    private customerServ: CustomersService,
    private toster: ToastrService
  ) {
    this.loadData();
  }

  loadData() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.SubsriptionServ.get().subscribe((data: any) => {
      this.userSubscription = data.find((sub: any) => {
        return sub.email == user.email;
      });
      this.isLoading = false;
    });
  }
  cancelSubscribtion(id: any) {
    if (
      !confirm('هل أنت متأكد من حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه!')
    ) {
      return;
    }
    this.customerServ.delete(this.userSubscription.customerId).subscribe();
    this.SubsriptionServ.delete(id).subscribe();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
