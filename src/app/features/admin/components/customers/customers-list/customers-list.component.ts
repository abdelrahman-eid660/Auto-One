import { SubscriptionsService } from './../../../../../core/services/subscriptions.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CustomersService } from '../../../../../core/services/customers.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { OrderServerService } from '../../../../../core/services/order-server.service';
import { OrderProductsService } from '../../../../../core/services/order-products.service';

@Component({
  selector: 'app-customers-list',
  imports: [DatePipe, NgClass, NgIf, NgFor],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})
export class CustomersListComponent {
  AllData_Customer!: any;
  AllData_service!: any;
  productCustomers!: any;
  serviceCustomers!: any;
  products!: any;

  // متغيرات الموديل
  selectedProductCustomer: any = null;
  selectedServiceCustomer: any = null;

  showProductModal: boolean = false;
  showServiceModal: boolean = false;

  modalType: 'product' | 'service' | null = null;
  selectedCustomer: any = null;

  openModal(customer: any, type: 'product' | 'service') {
    this.selectedCustomer = customer;
    this.modalType = type;
  }

  constructor(
    private customerServ: CustomersService,
    private subscriptionServ: SubscriptionsService,
    private toster: ToastrService,
    private orderProductsServ: OrderProductsService,
    private router: Router
  ) {
    this.getServiceData();
    this.getProductsData();
  }

  getServiceData() {
    forkJoin({
      customers: this.customerServ.get(),
      services: this.subscriptionServ.get(),
    }).subscribe((data: any) => {
      this.AllData_Customer = data.customers;
      this.AllData_service = data.services;

      this.serviceCustomers = this.AllData_Customer.filter(
        (customerID: any) => {
          return this.AllData_service.some((serviceID: any) => {
            return serviceID.customerId == customerID.id;
          });
        }
      ).map((customer: any) => {
        const customerServices = this.AllData_service.filter(
          (customserv: any) => {
            return customserv.customerId == customer.id;
          }
        );
        return {
          ...customer,
          service: customerServices,
        };
      });
    });
  }
  getProductsData() {
    this.orderProductsServ.get().subscribe((data: any) => {
      this.productCustomers = data;
      this.products = this.productCustomers
        .filter((order: any) => order['0']?.items)
        .flatMap((order: any) =>
          order['0'].items.map((prod: any) => ({
            ...prod,
            orderID: order.id,
          }))
        );
    });
  }
  rm(){
    this.AllData_Customer.forEach((item : any)=>{
      this.customerServ.delete(item.id).subscribe()
    })
  }
  getOrder(orderID: string) {
    return this.products.filter((p: any) => p.orderID === orderID);
  }
  openCustomerDetails(customer: any) {
    this.selectedProductCustomer = customer;
    this.selectedProductCustomer = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showProductModal = false;
    this.showServiceModal = false;
    document.body.style.overflow = 'auto';
  }

  remove(customerId: number, customerName: string) {
    if (confirm(`هل أنت متأكد من حذف العميل "${customerName}"؟`)) {
      this.customerServ.delete(customerId).subscribe({
        next: () => {
          this.toster.success('', 'تم حذف العميل بنجاح', {
            timeOut: 1200,
          });
          this.getServiceData();
        },
        error: (error) => {
          this.toster.error('', 'حدث خطأ أثناء حذف العميل', {
            timeOut: 1200,
          });
          console.error('Error deleting customer:', error);
        },
      });
          setTimeout(() => {
      window.location.reload()
    }, 1250);
    }
  }

  getCustomerStatus(customer: any): string {
    const services = customer.service || [];
    const hasActiveService = services.some(
      (service: any) => service.status === 'active'
    );
    return hasActiveService ? 'نشط' : 'غير نشط';
  }
  getCustomerProductsStatus(customer: any): string {
    const order = customer;
    const isActive = order?.status === 'active';
    return isActive ? 'نشط' : 'غير نشط';
  }
  getStatusBadgeProductsClass(customer: any): string {
    return this.getCustomerProductsStatus(customer) === 'نشط'
      ? 'bg-success'
      : 'bg-secondary';
  }
  getStatusBadgeClass(customer: any): string {
    return this.getCustomerStatus(customer) === 'نشط'
      ? 'bg-success'
      : 'bg-secondary';
  }

  getServiceStatusBadge(status: string): string {
    const statusClasses: { [key: string]: string } = {
      active: 'bg-success',
      pending: 'bg-warning',
      expired: 'bg-danger',
      inactive: 'bg-secondary',
    };
    return statusClasses[status] || 'bg-secondary';
  }

  getServiceStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      active: 'نشط',
      pending: 'قيد الانتظار',
      expired: 'منتهي',
      inactive: 'غير نشط',
    };
    return statusMap[status] || status;
  }

  formatFeatures(features: any): string[] {
    if (!features) return ['لا توجد مميزات'];

    if (Array.isArray(features)) {
      return features;
    }

    if (typeof features === 'string') {
      return features.split('\n').filter((f: string) => f.trim());
    }

    return ['لا توجد مميزات'];
  }

  getCustomerStats() {
    const services = this.selectedServiceCustomer?.service || [];
    const totalServices = services.length;
    const activeServices = services.filter(
      (service: any) => service.status === 'active'
    ).length;
    const totalRevenue = services.reduce(
      (total: number, service: any) => total + (service.price || 0),
      0
    );
    return {
      totalServices,
      activeServices,
      totalRevenue,
      inactiveServices: totalServices - activeServices,
    };
  }
  openServiceModal(customer: any) {
    this.selectedServiceCustomer = customer;
    this.showServiceModal = true;
    document.body.style.overflow = 'hidden';
  }
  openProductModal(customer: any) {
    this.selectedProductCustomer = customer;
    this.showProductModal = true;
    document.body.style.overflow = 'hidden';
  }
  edit(id: any) {
    this.router.navigateByUrl(`/admin/customersproduct-update/${id}`);
    document.body.style.overflow = 'auto';
  }
  editServic(id: any) {
    this.router.navigateByUrl(`/admin/customers-update/${id}`);
    document.body.style.overflow = 'auto';
  }
}
