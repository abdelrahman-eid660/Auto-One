import { Component } from '@angular/core';
import { PricingService } from '../../../../../core/services/pricing.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing-list',
  imports: [CurrencyPipe],
  templateUrl: './pricing-list.component.html',
  styleUrl: './pricing-list.component.css',
})
export class PricingListComponent {
  pricingData!: any;
  constructor(
    private pricingServ: PricingService,
    private toster: ToastrService,
    private router: Router
  ) {
    this.getData();
  }
  getData() {
    this.pricingServ.get().subscribe((data: any) => {
      this.pricingData = data;
    });
  }
  goToAdd() {
    this.router.navigateByUrl('/admin/pricing-create');
  }
  onEdit(id: any) {
    this.router.navigateByUrl(`/admin/pricing-update/${id}`);
  }
  onDelete(id: any) {
    this.pricingServ.delete(id).subscribe((data) => {
      this.toster.error('', 'تم حذف الباقة بنجاح', {
        timeOut: 1200,
      });
    });
    setTimeout(() => {
      window.location.reload();
    }, 1250);
    this.getData();
  }
}
