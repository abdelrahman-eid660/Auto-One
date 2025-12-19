import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../../../core/services/products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-create',
  imports: [ReactiveFormsModule],
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css'],
})
export class ProductsCreateComponent {
  DefultCount: number = 1;
  constructor(
    private productServ: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private toster: ToastrService
  ) {
    this.createProduct();
  }
  productsForm!: FormGroup;
  createProduct() {
    this.productsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      count: ['', Validators.required],
      price: [0, Validators.required],
      discount: [0],
      total: [{ value: 0, disabled: true }],
      image: ['', Validators.required],
      marka: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.calculateTotal();
  }

  get controls() {
    return this.productsForm.controls;
  }
  calculateTotal() {
    this.productsForm.get('price')?.valueChanges.subscribe(() => {
      this.updateTotal();
    });

    this.productsForm.get('discount')?.valueChanges.subscribe(() => {
      this.updateTotal();
    });
  }

  updateTotal() {
    const price = Number(this.productsForm.get('price')?.value) || 0;
    const discount = Number(this.productsForm.get('discount')?.value) || 0;
    let total = price;

    if (discount > 0) {
      total = price - (price * discount) / 100;
    }

    this.productsForm.patchValue({ total });
  }

  onsubmit() {
    const productData = this.productsForm.getRawValue();

    this.productServ.post(productData).subscribe(() => {
      this.router.navigateByUrl('/admin/product-list');
      this.toster.success('تم إضافة المنتج بنجاح', '', {
        timeOut: 1200,
      });
    });
  }
}
