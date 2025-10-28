import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
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
  toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }
}
