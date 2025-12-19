import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../../../core/services/service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ourservice-create',
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './ourservice-create.component.html',
  styleUrl: './ourservice-create.component.css'
})
export class OurserviceCreateComponent {
   constructor(private ourServiceServ : ServiceService , private fb : FormBuilder , private router : Router , private toster : ToastrService){
    this.createPricing()
  }
  serviceForm! : FormGroup
  createPricing(){
    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })
  }
  onSubmit(){
    this.ourServiceServ.post(this.serviceForm.value).subscribe((data)=>{
      this.toster.success("","تم اضافة خدمة بنجاح",{
        timeOut : 3000
      })
      this.router.navigateByUrl("/admin/ourservice-list")
    })
  }
}
