import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderProductsService } from '../../../../../core/services/order-products.service';

@Component({
  selector: 'app-customers-product-update',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './customers-product-update.component.html',
  styleUrl: './customers-product-update.component.css',
})
export class CustomersProductUpdateComponent {
  showVisa: boolean = false;
  productsForm!: FormGroup;
  customerId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private orderProductsServ: OrderProductsService
  ) {}

  ngOnInit() {
    this.createForm();
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.loadProductsData();
  }

  createForm() {
    this.productsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      cvv: [''],
      expireDate: [''],
      total: [0],
      items: this.fb.array([]),
    });
  }

  get itemsArray(): FormArray {
    return this.productsForm.get('items') as FormArray;
  }

  createItem(item: any): FormGroup {
    return this.fb.group({
      id: [item.id],
      name: [item.name],
      description: [item.description],
      price: [item.price],
      discount: [item.discount],
      image: [item.image],
      quntity: [item.quntity],
      total: [item.total],
    });
  }

  loadProductsData() {
    this.orderProductsServ.getById(this.customerId).subscribe((order: any) => {
      this.productsForm.patchValue(order);
      order["0"].items.forEach((prod: any) =>
        this.itemsArray.push(this.createItem(prod))
      );
      this.updateOrderTotal();
      this.toggleVisa();
    });
  }

  toggleVisa() {
    this.showVisa = this.productsForm.value.paymentMethod === 'visa';
  }

  updateProductTotal(i: number) {
    let item = this.itemsArray.at(i);
    let price = item.value.price;
    let qty = item.value.quntity;
    let discount = item.value.discount || 0;

    let newTotal = qty * (price - discount);
    item.patchValue({ total: newTotal });

    this.updateOrderTotal();
  }

  increaseQty(i: number) {
    let item = this.itemsArray.at(i);
    item.patchValue({ quntity: item.value.quntity + 1 });
    this.updateProductTotal(i);
  }

  decreaseQty(i: number) {
    let item = this.itemsArray.at(i);
    if (item.value.quntity > 1) {
      item.patchValue({ quntity: item.value.quntity - 1 });
      this.updateProductTotal(i);
    }
  }

  removeDiscount(i: number) {
    let item = this.itemsArray.at(i);
    item.patchValue({ discount: 0 });
    this.updateProductTotal(i);
  }

  removeItem(index: number) {
    const removedTotal = this.itemsArray.at(index).value.total;
    this.itemsArray.removeAt(index);
    this.updateTotalAfterRemove(removedTotal);
  }

  updateTotalAfterRemove(price: number) {
    const currentTotal = this.productsForm.get('total')?.value || 0;
    this.productsForm.patchValue({
      total: currentTotal - price
    });
  }

  updateOrderTotal() {
    const total = this.itemsArray.controls.reduce((sum, item: any) =>
      sum + item.value.total, 0);
    this.productsForm.patchValue({ total });
  }

  saveUpdate() {
    this.orderProductsServ
      .put(this.productsForm.value, this.customerId)
      .subscribe(() => {
        this.toaster.success('تم حفظ التعديلات بنجاح','',{
          timeOut:1200
        });
      });
  }
}
