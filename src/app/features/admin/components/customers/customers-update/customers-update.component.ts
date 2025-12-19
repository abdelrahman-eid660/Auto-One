import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../../../../core/services/customers.service';
import { SubscriptionsService } from '../../../../../core/services/subscriptions.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderProductsService } from '../../../../../core/services/order-products.service';

@Component({
  selector: 'app-customers-update',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './customers-update.component.html',
  styleUrl: './customers-update.component.css',
})
export class CustomersUpdateComponent {
  showVisa: boolean = false;
  customerId: any;
  serviceId: any;
  subscriptionId: any;
  customerForm!: FormGroup;
  serviceForm!: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerServ: CustomersService,
    private subscriptionServ: SubscriptionsService,
    private toaster: ToastrService,
    private orderProductsServ : OrderProductsService
  ) {
    this.customerServiceForm();
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.loadData()
  }

  loadData() {
    forkJoin({
      customer: this.customerServ.getById(this.customerId),
      services: this.subscriptionServ
        .get()
        .pipe(
          map((subs: any) =>
            subs.filter((s: any) => s.customerId === this.customerId)
          )
        ),
    }).subscribe((data: any) => {
      this.customerForm.patchValue(data.customer);
      if(data.services.length > 0 && data.services){
        this.serviceId = data.services[0].id;
        this.serviceForm.patchValue(data.services[0]);
      }
    });
  }

  customerServiceForm() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      expireDate: ['', [Validators.required]],
    });
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      features: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  toggleVisa() {
    this.showVisa = this.customerForm.value.paymentMethod === 'visa';
  }

  updateAll() {
    this.customerServ.put(this.customerForm.value , this.customerId).subscribe((data : any)=>{})
    this.subscriptionServ.put({...this.serviceForm.value,customerId: this.customerId} , this.serviceId).subscribe((data : any)=>{})
    this.toaster.success("","تم تعديل بيانات العميل بنجاح",{
      timeOut:1200
    })
  }
}
