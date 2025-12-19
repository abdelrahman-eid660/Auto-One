import { Component } from '@angular/core';
import { OrderProductsService } from '../../../../core/services/order-products.service';
import { forkJoin, finalize } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service';
import { AdminModule } from "../../../admin/admin.routes.module";

@Component({
  selector: 'app-profile-orderds',
  imports: [AdminModule],
  templateUrl: './profile-orderds.component.html',
  styleUrl: './profile-orderds.component.css',
})
export class ProfileOrderdsComponent {
  myorders!: any;
  isLoading : boolean = true
  constructor(private orderServ: OrderProductsService) {
    this.loadData();
  }
  loadData() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.orderServ.get().subscribe((data: any) => {
        this.myorders = data.filter((order: any) => {
          return order.email == user.email;
        });
        this.isLoading = false
    });
  }
}
