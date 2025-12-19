import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'AutoOne';

  constructor(private router: Router) {}

  ngAfterViewInit() {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          AOS.refresh();
        }, 200);
      }
    });
  }
}
