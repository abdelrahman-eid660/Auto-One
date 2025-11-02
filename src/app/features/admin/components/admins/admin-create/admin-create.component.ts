import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AdminsService } from '../../../../../core/services/admins.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css'],
})
export class AdminCreateComponent {
  constructor(private adminsServ : AdminsService , private toster : ToastrService , private router : Router, private fb : FormBuilder) {
    this.createAdmins()
  }
  adminForm! : FormGroup
  createAdmins(){
    this.adminForm = this.fb.group({
      name : ["",[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      email : ["",[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      phone : ["",[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      role : ["",[Validators.required]],
      password : ["",[Validators.required,Validators.minLength(6),Validators.maxLength(50)]],
    })
  }
  get controls(){
    return this.adminForm.controls
  }
  onSubmit(){
    this.adminsServ.post(this.adminForm.value).subscribe((data)=>{
      this.toster.success("","تم اضافة مشرف بنجاح",{
        timeOut:3000
      })
      this.router.navigateByUrl("/admin/admin-list")
    })
  }
}
