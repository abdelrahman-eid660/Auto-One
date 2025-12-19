import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-update',
  imports: [ReactiveFormsModule],
  templateUrl: './products-update.component.html',
  styleUrl: './products-update.component.css',
})
export class ProductsUpdateComponent {
  id!: any;
  constructor(
    private productServ: ProductsService,
    private fb: FormBuilder,
    private toster: ToastrService,
    private activatedtoute: ActivatedRoute,
    private router: Router
  ) {
    this.updateProduct();

    this.id = this.activatedtoute.snapshot.paramMap.get('id');
    this.productServ.getById(this.id).subscribe((data: any) => {
      this.productsForm.patchValue(data);
    });
  }
  productsForm!: FormGroup;
  updateProduct() {
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
  update() {
    const productData = this.productsForm.getRawValue();
    this.productServ.put(productData, this.id).subscribe((data: any) => {
      this.router.navigateByUrl('/admin/product-list');
      this.toster.success('تم تعديل المنتج  بنجاح', '', {
        timeOut: 3000,
      });
    });
  }
}
