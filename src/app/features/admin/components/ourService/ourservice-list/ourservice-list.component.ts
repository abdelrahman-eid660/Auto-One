import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../../../../../core/services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ourservice-list',
  standalone: true,
  imports: [NgFor, SlicePipe],
  templateUrl: './ourservice-list.component.html',
  styleUrls: ['./ourservice-list.component.css'],
})
export class OurserviceListComponent {
  ServiceData!: any;
  filterService!: any;
  constructor(
    private ourServicesServ: ServiceService,
    private router: Router,
    private toster: ToastrService
  ) {
    this.getData();
  }
  getData() {
    this.ourServicesServ.get().subscribe((data: any) => {
      this.ServiceData = data;
      this.filterService = [...data];
    });
  }
  addService() {
    this.router.navigateByUrl('/admin/ourservice-create');
  }
  filter(event: Event) {
    const value = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    if (!value) {
      this.filterService = [...this.ServiceData];
      return;
    }
    this.filterService = this.ServiceData.filter((serv: any) => {
      return serv.title.toLocaleLowerCase().startsWith(value);
    });
  }
  edit(id: any) {
    this.router.navigateByUrl(`/admin/ourservice-update/${id}`);
  }
  remove(id: any) {
    this.ourServicesServ.delete(id).subscribe((data) => {
      this.toster.error('', 'تم حذف الخدمة بنجاح', {
        timeOut: 1200,
      });
    });
    setTimeout(() => {
      window.location.reload();
    }, 1250);
    this.getData();
  }
}
