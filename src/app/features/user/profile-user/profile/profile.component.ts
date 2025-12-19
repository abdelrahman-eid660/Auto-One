import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminModule } from '../../../admin/admin.routes.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, AdminModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  editing = false;
  isSidebarOpen = false;
  userData!: any;
  avatar!: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tostar: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    const data = localStorage.getItem('user');
    this.userData = data ? JSON.parse(data) : null;
    if (this.userData.gender == 'male') {
      this.avatar = 'https://i.postimg.cc/XqCYPKKh/user_men.jpg';
    } else {
      this.avatar = 'https://i.postimg.cc/hvdtY88N/user_women.png';
    }
  }
  loginOut() {
    this.tostar.success('', 'تم تسجيل الخروج بنجاح', {
      timeOut: 1200,
    });
    localStorage.removeItem('user');
    this.router.navigateByUrl('/user/home');
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.querySelector('.sidebar');

    if (this.isSidebarOpen) {
      sidebar?.classList.add('show');
    } else {
      sidebar?.classList.remove('show');
    }
  }
}
