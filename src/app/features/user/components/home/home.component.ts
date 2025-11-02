import { Component  } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images = [
    {img : "assets/img/products/Spare parts/spare_parts1.jpg"},
    {img : "assets/img/products/Spare parts/spare_parts1.jpg"},
    {img : "assets/img/products/Spare parts/spare_parts1.jpg"},
    {img : "assets/img/products/Spare parts/spare_parts1.jpg"},
    {img : "assets/img/products/Spare parts/spare_parts1.jpg"},
    {img : "assets/img/products/Spare parts/spare_parts1.jpg"},
  ]
}
