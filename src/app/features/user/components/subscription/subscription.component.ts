import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PricingService } from '../../../../core/services/pricing.service';
import { NgIf } from '@angular/common';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
import { CustomersService } from '../../../../core/services/customers.service';

@Component({
  selector: 'app-subscription',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent {
  showVisa: boolean = false;
  subscriptionForm!: FormGroup;
  pricingSubscription!: any;
  userSubscription: any[] = [];
  currentDate = new Date().toISOString().split('T')[0];
  endDate: string = '';
  userLogin = localStorage.getItem('user');
  constructor(
    private getPricingServ: PricingService,
    private subscriptionServ: SubscriptionsService,
    private customerServ: CustomersService,
    // private userSubsriptionServ: UserSubscriptionService,
    private activedroute: ActivatedRoute,
    private fb: FormBuilder,
    private toster: ToastrService,
    private router: Router
  ) {
    this.getDataById();
  }
  calculateEndDate(duration: string) {
    let months = parseInt(duration);
    let start = new Date(this.currentDate);
    start.setMonth(start.getMonth() + months);
    this.endDate = start.toISOString().split('T')[0];
  }
  getDataById() {
    const id = this.activedroute.snapshot.paramMap.get('id');
    if (id) {
      this.getPricingServ.getById(id).subscribe((data: any) => {
        this.pricingSubscription = {
          ...data,
          features: data.features.split('\n'),
        };
        this.calculateEndDate(data.duration);
        this.getData();
      });
    }
  }
  getData() {
    this.subscriptionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      startDate: [this.currentDate],
      paymentMethod: ['cash'],
      cardNumber: ['', Validators.maxLength(15)],
      cvv: ['', Validators.maxLength(3)],
      expireDate: [''],
    });
  }
  toggleVisa(show: boolean) {
    this.showVisa = show;

    if (show) {
      this.subscriptionForm
        .get('cardNumber')
        ?.setValidators(Validators.required);
      this.subscriptionForm.get('cvv')?.setValidators(Validators.required);
      this.subscriptionForm
        .get('expireDate')
        ?.setValidators(Validators.required);
    } else {
      this.subscriptionForm.get('cardNumber')?.clearValidators();
      this.subscriptionForm.get('cvv')?.clearValidators();
      this.subscriptionForm.get('expireDate')?.clearValidators();
    }

    this.subscriptionForm.get('cardNumber')?.updateValueAndValidity();
    this.subscriptionForm.get('cvv')?.updateValueAndValidity();
    this.subscriptionForm.get('expireDate')?.updateValueAndValidity();
  }
  submitSubscription() {
    if (this.subscriptionForm.valid) {
      const formData = this.subscriptionForm.value;

      if (
        this.subscriptionForm.value.paymentMethod === 'visa' &&
        (!this.subscriptionForm.value.cardNumber ||
          !this.subscriptionForm.value.cvv ||
          !this.subscriptionForm.value.expireDate)
      ) {
        this.toster.error('يرجى ادخال بيانات البطاقة');
        return;
      }

      this.customerServ.post(formData).subscribe((customer: any) => {
        const servicesData = {
          customerId: customer.id,
          serviceId: this.pricingSubscription.id,
          name: this.pricingSubscription.name,
          email: this.subscriptionForm.get('email')?.value,
          price: this.pricingSubscription.price,
          duration: this.pricingSubscription.duration,
          features: this.pricingSubscription.features,
          startDate: this.currentDate,
          endDate: this.endDate,
          status: 'active',
        };

        this.subscriptionServ.post(servicesData).subscribe((sub: any) => {
          this.toster.success('', 'تم تسجيل الإشتراك بنجاح', {
            timeOut: 1200,
          });
          setTimeout(() => {
            this.router.navigateByUrl('user/profile/mysubscription');
          }, 1250);
        });
      });
    }
  }
}
