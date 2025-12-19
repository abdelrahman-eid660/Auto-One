import { Component } from '@angular/core';
import { BlogService } from '../../../../../core/services/blog.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent {
  blogData!: any;
  isLoading: boolean = true;
  constructor(
    private blosgServ: BlogService,
    private router: Router,
    private toster: ToastrService
  ) {
    this.getData();
  }
  getData() {
    this.blosgServ.get().subscribe((data) => {
      this.blogData = data;
    });
  }
  edit(id: any) {
    this.router.navigateByUrl(`/admin/blog-update/${id}`);
  }
  delete(id: any) {
    this.blosgServ.delete(id).subscribe((data) => {
      this.toster.error('', 'تم حذف المدونة بنجاح', {
        timeOut: 1200,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1250);
      this.getData();
    });
  }
}
