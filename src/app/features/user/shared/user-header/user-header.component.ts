import { NgIf } from '@angular/common';
import { Component, PACKAGE_ROOT_URL } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-header',
  imports: [RouterLink, RouterLinkActive, NgIf, ReactiveFormsModule],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent {
  errorMessage: string = '';
  isLoggined = localStorage.getItem('user');
  showModal: boolean = false;
  isRegister: boolean = false;
  userData!: any;
  allData!: any;
  loginForm!: FormGroup;
  constructor(
    private userServ: UsersService,
    private fb: FormBuilder,
    private toster: ToastrService,
    private router: Router
  ) {
    this.loadData();
    this.getData();
  }
  loadData() {
    this.userServ.get().subscribe((data: any) => {
      this.allData = data;
      this.userData = data;
      this.userData = this.userData.map((data: any) => {
        return { Email: data.email, Password: data.password };
      });
    });
  }
  getData() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  get EmailUser() {
    return this.loginForm.get('email');
  }
  get passwordUser() {
    return this.loginForm.get('password');
  }

  login() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.EmailUser?.value;
    const password = this.passwordUser?.value;

    const user = this.userData.find(
      (u: any) => u.Email === email && u.Password === password
    );

    if (!user) {
      this.errorMessage = '❌ البريد الإلكتروني أو كلمة المرور غير صحيحة';
      return;
    }

    const UserData = this.allData.find((data: any) => {
      return user.Email === data.email && user.Password === data.password;
    });
    this.toster.success('', 'مرحبا بك', { timeOut: 3000 });

    localStorage.setItem('user', JSON.stringify(UserData));
    this.closeAuthModal();
    setTimeout(() => {
      this.router.navigateByUrl('/user/profile');
    }, 1200);
    setTimeout(() => {
      window.location.reload()
    }, 1250);
  }

  openAuthModal() {
    this.showModal = true;
  }

  closeAuthModal() {
    this.showModal = false;
    this.isRegister = false;
  }
}
