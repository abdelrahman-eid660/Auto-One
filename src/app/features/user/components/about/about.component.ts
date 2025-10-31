import { Component, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-about',
  imports: [NgClass],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
 stats = [
    { target: 30, current: 0, label: 'سنوات الخبرة', icon: 'fa-hourglass-start', suffix: 'ex' },
    { target: 700, current: 0, label: 'عملاء سعداء', icon: 'fa-users', suffix: '+' },
    { target: 27000, current: 0, label: 'المنتجات المباعة من قطع الغيار', icon: 'fa-gear', suffix: 'k' , active: "active" },
    { target: 2000, current: 0, label: 'السيارات المباعة', icon: 'fa-car', suffix: 'k' }
  ];
 constructor(){
   this.startcounting()
 }
 startcounting(){
  this.stats.forEach((stat)=>{
    const increment = stat.target / 100
    const interval = setInterval(() => {
      if(stat.current < stat.target){
        stat.current = Math.ceil(stat.current + increment)
      }else{
        stat.current = stat.target
        clearInterval(interval)
      }
    }, 50);
  })
 }
}
