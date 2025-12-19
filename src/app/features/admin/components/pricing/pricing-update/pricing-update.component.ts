import { Component } from '@angular/core';
import { PricingService } from '../../../../../core/services/pricing.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pricing-update',
  imports: [ReactiveFormsModule],
  templateUrl: './pricing-update.component.html',
  styleUrl: './pricing-update.component.css',
})
export class PricingUpdateComponent {
  id!: any;
  pricingForm!: FormGroup;
  constructor(
    private pricingServ: PricingService,
    private fb: FormBuilder,
    private router: Router,
    private toster: ToastrService,
    private activatedroute: ActivatedRoute
  ) {
    this.id = activatedroute.snapshot.paramMap.get('id');
    pricingServ.getById(this.id).subscribe((data) => {
      this.pricingForm.patchValue(data);
    });
    this.updatePricing();
  }
  updatePricing() {
    this.pricingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      features: ['', Validators.required],
    });
  }
  get controls() {
    return this.pricingForm.controls;
  }
  addPricing() {
    this.pricingServ.post(this.pricingForm.value).subscribe((data) => {
      this.toster.success('', 'تم اضافة الباقة بنجاح', {
        timeOut: 3000,
      });
      this.router.navigateByUrl('/admin/pricing-list');
    });
  }
  update() {
    this.pricingServ.put(this.pricingForm.value, this.id).subscribe((data) => {
      this.toster.success('', 'تم تعديل البيانات بنجاح', {
        timeOut: 3000,
      });
      this.router.navigateByUrl('/admin/pricing-list');
    });
  }
  onCancel() {
    this.router.navigateByUrl('/admin/pricing-list');
  }
}
