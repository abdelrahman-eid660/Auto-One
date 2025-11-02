import { Component } from '@angular/core';
import { ProductsService } from '../../../../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [ RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  productsData!: any;
  productDataFilter!: any;
  constructor(
    private productServ: ProductsService,
    private toster: ToastrService,
  ) {
    this.getData();
  }
  getData() {
    this.productServ.get().subscribe((data: any) => {
      this.productsData = data;
      this.productDataFilter = [...data];
    });
  }
  filter(event: Event) {
    const value = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    if (!value) {
      this.productDataFilter = [...this.productsData];
      return;
    }
    this.productDataFilter = this.productsData.filter((data: any) => {
      return (
        data.name.toLocaleLowerCase().startsWith(value) ||
        data.code.toLocaleLowerCase().startsWith(value)
      );
    });
  }
  remove(id: any) {
    this.productServ.delete(id).subscribe((data) => {
      this.toster.error('تم حذف المنتج بنجاح',"",{
        timeOut : 3000
      });
      this.getData();
    });
  }
}
