import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { AdminCreateComponent } from "./components/admins/admin-create/admin-create.component";
import { AdminListComponent } from "./components/admins/admin-list/admin-list.component";
import { AdminUpdateComponent } from "./components/admins/admin-update/admin-update.component";
import { AdminLoginComponent } from "./components/admins/admin-login/admin-login.component";
import { BlogCreateComponent } from "./components/blog/blog-create/blog-create.component";
import { BlogListComponent } from "./components/blog/blog-list/blog-list.component";
import { BlogUpdateComponent } from "./components/blog/blog-update/blog-update.component";
import { CustomersListComponent } from "./components/customers/customers-list/customers-list.component";
import { OurserviceCreateComponent } from "./components/ourService/ourservice-create/ourservice-create.component";
import { OurserviceListComponent } from "./components/ourService/ourservice-list/ourservice-list.component";
import { OurserviceUpdateComponent } from "./components/ourService/ourservice-update/ourservice-update.component";
import { PricingCreateComponent } from "./components/pricing/pricing-create/pricing-create.component";
import { PricingListComponent } from "./components/pricing/pricing-list/pricing-list.component";
import { PricingUpdateComponent } from "./components/pricing/pricing-update/pricing-update.component";
import { ProductsCreateComponent } from "./components/products/products-create/products-create.component";
import { ProductsListComponent } from "./components/products/products-list/products-list.component";
import { ProductsUpdateComponent } from "./components/products/products-update/products-update.component";
import { AdminError404Component } from "./shared/admin-error404/admin-error404.component";
import { NgModule } from "@angular/core";
import { AdminHomeComponent } from "./components/admin-home/admin-home.component";

const route : Routes = [
  {path : '' , component : AdminLayoutComponent , children : [
    {path : 'home' , component : AdminHomeComponent , title : 'الرئيسية'},
    {path : 'admin-create' , component : AdminCreateComponent , title : 'اضافة مشرف'},
    {path : 'admin-list' , component : AdminListComponent , title : 'قائمة المشرفيين'},
    {path : 'admin-update/:id' , component : AdminUpdateComponent , title : 'تعديل بيانات المشرف'},
    {path : 'admin-login' , component : AdminLoginComponent , title : 'تسجيل الدخول'},
    {path : 'blog-create' , component : BlogCreateComponent , title : 'اضافة مدونة'},
    {path : 'blog-list' , component : BlogListComponent , title : 'قائمة المدونات'},
    {path : 'blog-update/:id' , component : BlogUpdateComponent , title : 'تعديل المدونه'},
    {path : 'customers' , component : CustomersListComponent , title : 'قائمة العملاء'},
    {path : 'ourservice-create' , component : OurserviceCreateComponent , title : 'اضافة خدمة'},
    {path : 'ourservice-list' , component : OurserviceListComponent , title : 'قائمة خدماتنا'},
    {path : 'ourservice-update/:id' , component : OurserviceUpdateComponent , title : 'تعديل الخدمة'},
    {path : 'pricing-create' , component : PricingCreateComponent , title : 'اضافة باقة'},
    {path : 'pricing-list' , component : PricingListComponent , title : 'قائمة باقاتنا'},
    {path : 'pricing-update/:id' , component : PricingUpdateComponent , title : 'تعديل باقة'},
    {path : 'product-create' , component :ProductsCreateComponent , title : 'اضافة منتج'},
    {path : 'product-list' , component : ProductsListComponent , title : 'قائمة منتجاتنا'},
    {path : 'product-update/:id' , component : ProductsUpdateComponent , title : 'تعديل منتج'},
    {path : '' , redirectTo : 'home' , pathMatch:'full' , title : 'الرئيسية'},
    {path : '**' , component : AdminError404Component , title : 'خطاء'},
  ],
},
];
@NgModule({
  imports : [RouterModule.forChild(route)],
  exports : [RouterModule],
})
export class AdminModule {}
