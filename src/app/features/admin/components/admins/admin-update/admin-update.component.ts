import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminsService } from '../../../../../core/services/admins.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent {
  id! : any
  constructor(private adminsServ : AdminsService , private toster : ToastrService , private router : Router, private fb : FormBuilder , private activetedroute : ActivatedRoute) {
    this.id = this.activetedroute.snapshot.paramMap.get('id')
    this.adminsServ.getById(this.id).subscribe((data)=>{
      this.adminForm.patchValue(data)
    })
    this.updateAdmins()
  }
  adminForm! : FormGroup
  updateAdmins(){
    this.adminForm = this.fb.group({
      name : ["",[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      email : ["",[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.email]],
      phone : ["",[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      role : ["",[Validators.required]],
      password : ["",[Validators.required,Validators.minLength(6),Validators.maxLength(50)]],
    })
  }
  get controls(){
    return this.adminForm.controls
  }
  update(){
    this.adminsServ.put(this.adminForm.value , this.id).subscribe((data)=>{
      this.toster.success("","تم تعديل بيانات المشرف بنجاح",{
        timeOut:3000
      })
      this.router.navigateByUrl("/admin/admin-list")
    })
  }
  onCancel() {
    this.router.navigateByUrl('/admin/admin-list');
  }
}
