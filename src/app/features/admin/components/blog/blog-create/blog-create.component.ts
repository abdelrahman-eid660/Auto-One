import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogService } from '../../../../../core/services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  constructor(
    private blogServ: BlogService,
    private fb: FormBuilder,
    private toster: ToastrService,
    private router: Router
  ) {
    this.createBlog()
  }
  blogForm!: FormGroup;
  createBlog() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  onSubmit(){
    this.blogServ.post(this.blogForm.value).subscribe((data)=>{
      this.toster.success("","تم انشاء مدونة بنجاح",{
        timeOut : 1200
      })
      this.router.navigateByUrl('/admin/blog-list')
    })
  }
}
