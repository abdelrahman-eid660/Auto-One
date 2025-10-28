import { HomeComponent } from './components/home/home.component';
import { ProductCompareComponent } from './components/product-compare/product-compare.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { PopulareQuestionsComponent } from './components/populare-questions/populare-questions.component';
import { ServicesComponent } from './components/services/services.component';
import { StoreComponent } from './components/store/store.component';
import { UserLayOutComponent } from './layout/user-lay-out/user-lay-out.component';
import { RouterModule, Routes } from "@angular/router";
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserError404Component } from './shared/user-error404/user-error404.component';
import { NgModule } from '@angular/core';
import { SubscriptionComponent } from './components/subscription/subscription.component';

const route : Routes =  [
  {
    path : '' , component :UserLayOutComponent , children : [
      {path : 'home' , component : HomeComponent , title : "الرئيسية"},
      {path : 'about' , component : AboutComponent , title : "معلومات عنا"},
      {path : 'store' , component : StoreComponent , title : "المتجر"},
      {path : 'services' , component : ServicesComponent , title : "الخدمات"},
      {path : 'blog' , component : BlogComponent , title : "مدونة"},
      {path : 'cart' , component : CartComponent , title : "العربة"},
      {path : 'contact' , component : ContactComponent , title : "التواصل"},
      {path : 'populare-questions' , component : PopulareQuestionsComponent , title : "الاسئلة الشائعة"},
      {path : 'product-compare' , component : ProductCompareComponent , title : "مقارنة المنتجات"},
      {path : 'product-details' , component : ProductsDetailsComponent , title : "تفاصيل المنتج"},
      {path : 'subscription' , component : SubscriptionComponent , title : " الاشتراكات"},
      {path : 'subscription/:id' , component : SubscriptionComponent , title : " الاشتراكات"},
      {path : 'wishlist' , component : WishlistComponent , title : "قائمة الرغبات"},
      {path : '' , redirectTo : 'home' , pathMatch :'full'},
      {path : '**' , component : UserError404Component , title : "خطاء"},
    ]
  }
]
@NgModule({
  imports : [RouterModule.forChild(route)],
  exports : [RouterModule]
})
export class UserModule{}
