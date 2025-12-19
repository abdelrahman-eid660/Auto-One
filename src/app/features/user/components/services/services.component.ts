import { Component, model } from '@angular/core';
import { ServiceService } from '../../../../core/services/service.service';
import { AdminModule } from '../../../admin/admin.routes.module';
import { PricingService } from '../../../../core/services/pricing.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-services',
  imports: [AdminModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  AllData: any = [];
  ServicesData: any = [];

  pricingData: any = [];
  constructor(
    private serviceServ: ServiceService,
    private pricingServ: PricingService,
    private router: Router
  ) {
    this.getService();
    this.getPricing();
  }
  getService() {
    this.serviceServ.get().subscribe((data: any) => {
      this.AllData = data;
      this.ServicesData = [...this.AllData].slice(4);
    });
  }
  getPricing() {
    this.pricingServ.get().subscribe((data: any) => {
      this.pricingData = data.map((item: any) => ({
        ...item,
        features: item.features.split('\n'),
      }));
    });
  }
  cart(id: any) {
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
    this.router.navigateByUrl(`/user/subscription/${id}`);
  }
  goToLogin() {
    window.location.href = '/user/login';
  }

  goToRegister() {
    window.location.href = '/user/signup';
  }
}
