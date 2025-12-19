import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  animations: [
    trigger('slideToggle', [
      state('void', style({ height: '0', overflow: 'hidden', opacity: 0 })),
      state('*', style({ height: '*', overflow: 'hidden', opacity: 1 })),
      transition(':enter', [animate('250ms ease-out')]),
      transition(':leave', [animate('200ms ease-in')]),
    ]),
  ],
})
export class AdminLayoutComponent {
  activeMenu: string | null = null;
  islogin: any = localStorage.getItem('admin') || null;
  constructor(private router: Router) {}
  toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }
  user() {
    this.router.navigateByUrl('/user');
  }
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuBtn = document.querySelector('.menu-toggle-btn');
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('active');
    menuBtn?.classList.toggle('none');
  }
  loginOut() {
    localStorage.removeItem('admin');
    setTimeout(() => {
      this.router.navigateByUrl('/admin/admin-login');
    }, 10);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
