import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminsService } from '../../../../../core/services/admins.service';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  users!: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminsServ: AdminsService,
    private toster: ToastrService
  ) {
    this.getData();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  getData() {
    this.adminsServ.get().subscribe((Data: any) => {
      this.users = Data;
    });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const userExist = this.users.find((user: any) => {
      return (
        user.email === this.loginForm.get('email')?.value &&
        user.password === this.loginForm.get('password')?.value
      );
    });

    if (!userExist) {
      this.toster.error('', 'خطاء في البريد الالكتروني او كلمة السر', {
        timeOut: 1200,
      });
      this.isSubmitting = false;
      return;
    }
    this.toster.success('', 'تم تسجيل الدخول بنجاح', {
      timeOut: 1200,
    });

    localStorage.setItem('admin', JSON.stringify(userExist));
    this.router.navigateByUrl('/admin/home');

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
