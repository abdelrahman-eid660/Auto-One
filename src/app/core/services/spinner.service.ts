import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  busyRequest = 0
  constructor(private spinner: NgxSpinnerService) {}
  show() {
    this.busyRequest++
    this.spinner.show();
  }
  hide(){
    this.busyRequest--
    setTimeout(()=>{
      this.spinner.hide()
    },500)
  }
}
