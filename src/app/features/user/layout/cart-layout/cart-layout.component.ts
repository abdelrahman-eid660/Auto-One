import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AdminModule } from '../../../admin/admin.routes.module';
declare var bootstrap: any;
@Component({
  selector: 'app-cart-layout',
  imports: [RouterOutlet, AdminModule],
  templateUrl: './cart-layout.component.html',
  styleUrl: './cart-layout.component.css',
})
export class CartLayoutComponent {
  constructor(private router : Router){}
  checkout() {
    const user = localStorage.getItem('user');
    if (!user) {
      const modalElem = document.getElementById('loginRequiredModal');
      const modal = new bootstrap.Modal(modalElem!);
      modal.show();
      document.body.addEventListener(
        'click',
        () => {
          modal.hide();
        },
        { once: true }
      );
      return;
    }
    this.router.navigateByUrl('/user/cart/checkout')

  }
  goToLogin() {
    window.location.href = '/user/login';
  }

  goToRegister() {
    window.location.href = '/user/signup';
  }
}
