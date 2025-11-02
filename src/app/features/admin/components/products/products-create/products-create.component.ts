import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../../../core/services/products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-create',
  imports: [ReactiveFormsModule],
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent {
  constructor(private productServ : ProductsService , private fb : FormBuilder , private router : Router , private toster : ToastrService){
    this.createProduct()
  }
  productsForm! : FormGroup
  createProduct(){
    this.productsForm = this.fb.group ({
      name : ["",[Validators.required,Validators.minLength(6),Validators.maxLength(40)]],
      code : ["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      description : ["",[Validators.required,Validators.minLength(5),Validators.maxLength(200)]],
      count : ["",[Validators.required]],
      price : ["",[Validators.required]],
      discount : [""],
      image : ["",[Validators.required]],
      marka : ["",[Validators.required]],
      category : ["",[Validators.required]],
    })
  }
  get controls(){
    return this.productsForm.controls
  }
  onsubmit(){
    this.productServ.post(this.productsForm.value).subscribe((data:any)=>{
      this.router.navigateByUrl('/admin/product-list')
      this.toster.success("تم اضافة منتج جديد بنجاح","",{
        timeOut:3000
      })
    })
  }
}
