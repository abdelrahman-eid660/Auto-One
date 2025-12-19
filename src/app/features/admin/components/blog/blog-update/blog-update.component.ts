import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../../../../core/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-update',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './blog-update.component.html',
  styleUrl: './blog-update.component.css'
})
export class BlogUpdateComponent {
  id! : any
  blogData! : any
  blogForm! : FormGroup
  constructor(private blogServ : BlogService , private router : Router , private toster : ToastrService , private fb: FormBuilder , private activedtourer : ActivatedRoute){
    this.id = activedtourer.snapshot.paramMap.get('id')
    blogServ.getById(this.id).subscribe((data)=>{
      this.blogForm.patchValue(data)
    })
    this.editData()
  }

  editData(){
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      date: ['', Validators.required],
    })
  }
  onSubmit(id : any){
    this.blogServ.put(this.blogForm.value , id).subscribe((data)=>{
      this.toster.success("","تم تحديث المدونة بنجاح",{
        timeOut : 3000
      })
      this.router.navigateByUrl("/admin/blog-list")
    })
  }
}
