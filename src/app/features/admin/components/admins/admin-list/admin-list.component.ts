import { Component } from '@angular/core';
import { AdminsService } from '../../../../../core/services/admins.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
})
export class AdminListComponent {
  adminsData!: any;
  constructor(private adminServ: AdminsService, private toster: ToastrService) {
    this.getData();
  }
  getData() {
    this.adminServ.get().subscribe((data) => {
      this.adminsData = data;
    });
  }
  remove(id: any) {
    this.adminServ.delete(id).subscribe((data) => {});
    localStorage.removeItem('admin')
    this.toster.error('', 'تم ازالة مشرف بنجاح', {
      timeOut: 1200,
    });
    setTimeout(() => {
      window.location.reload()
    }, 1250);
  }
}
