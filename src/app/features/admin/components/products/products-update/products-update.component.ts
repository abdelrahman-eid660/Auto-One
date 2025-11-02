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
    this.productServ.getById(this.id).subscribe((data : any) => {
      this.productsForm.patchValue(data);
    });
  }
  productsForm!: FormGroup;
  updateProduct() {
    this.productsForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      code: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      count: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: [''],
      image: ['', [Validators.required]],
      marka: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }
  get controls() {
    return this.productsForm.controls;
  }
  update() {
    this.productServ
      .put(this.productsForm.value, this.id)
      .subscribe((data: any) => {
        this.router.navigateByUrl('/admin/product-list');
        this.toster.success('تم تعديل المنتج  بنجاح', '', {
          timeOut: 3000,
        });
      });
  }
}
