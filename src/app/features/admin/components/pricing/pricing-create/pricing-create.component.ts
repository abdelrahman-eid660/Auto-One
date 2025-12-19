import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PricingService } from '../../../../../core/services/pricing.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pricing-create',
  imports: [ReactiveFormsModule ],
  templateUrl: './pricing-create.component.html',
  styleUrl: './pricing-create.component.css'
})
export class PricingCreateComponent {
    constructor(private pricingServ : PricingService , private fb : FormBuilder , private router : Router , private toster : ToastrService){
    this.createPricing()
  }
  pricingForm! : FormGroup
  createPricing(){
    this.pricingForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      features: ['', Validators.required],
    })
  }
  get controls(){
    return this.pricingForm.controls
  }
  addPricing(){
    this.pricingServ.post(this.pricingForm.value).subscribe((data)=>{
      this.toster.success("","تم اضافة الباقة بنجاح",{
        timeOut:3000
      })
      this.router.navigateByUrl('/admin/pricing-list')
    })
  }
  onCancel() {
    this.router.navigateByUrl('/admin/subscriptions');
  }

}
