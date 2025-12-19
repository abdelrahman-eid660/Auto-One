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
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserError404Component } from './shared/user-error404/user-error404.component';
import { NgModule } from '@angular/core';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartLayoutComponent } from './layout/cart-layout/cart-layout.component';
import { ProfileComponent } from './profile-user/profile/profile.component';
import { ProfileHomeComponent } from './profile-user/profile-home/profile-home.component';
import { ProfileOrderdsComponent } from './profile-user/profile-orderds/profile-orderds.component';
import { ProfileMysubsriptionComponent } from './profile-user/profile-mysubsription/profile-mysubsription.component';
import { ProfileSettingsComponent } from './profile-user/profile-settings/profile-settings.component';
import { SignupComponent } from './profile-user/signup/signup.component';
import { authGuard } from '../../core/guard/auth.guard';
import { LoginComponent } from './components/login/login.component';


const route : Routes =  [
  {
    path : '' , component :UserLayOutComponent , children : [
      {path : 'home' , component : HomeComponent , title : "الرئيسية"},
      {path : 'about' , component : AboutComponent , title : "معلومات عنا"},
      {path : 'store' , component : StoreComponent , title : "المتجر"},
      {path : 'services' , component : ServicesComponent , title : "الخدمات"},
      {path : 'blog' , component : BlogComponent , title : "مدونة"},
      {path : 'cart' , component : CartLayoutComponent , children: [
          {path: '', component: CartComponent, title: "عربة التسوق"},
          {path: 'checkout', component: CheckoutComponent, title: "الدفع" , canActivate : [authGuard]},
          {path: ':id', component: CartComponent, title: "عربة التسوق"}
        ]},
      {path : 'cart/checkout' , component : CheckoutComponent , title : "الدفع"},
      {path : 'cart/:id' , component : CartComponent , title : "العربة"},
      {path : 'contact' , component : ContactComponent , title : "التواصل"},
      {path : 'populare-questions' , component : PopulareQuestionsComponent , title : "الاسئلة الشائعة"},
      {path : 'product-compare' , component : ProductCompareComponent , title : "مقارنة المنتجات"},
      {path : 'subscription/:id' , component : SubscriptionComponent , title : " الاشتراكات" , canActivate : [authGuard]},
      {path : 'wishlist' , component : WishlistComponent , title : "قائمة الرغبات"},
      {path : 'signup' , component : SignupComponent , title : "انشاء حساب"},
      {path : 'login' , component : LoginComponent , title : "تسجيل الدخول"},
      {path : 'profile' , component : ProfileComponent, canActivate:[authGuard] , children:[
        {path : '' ,redirectTo:'home' , pathMatch:'full' , title : "حسابي"},
        {path : 'home' , component : ProfileHomeComponent , title : "حسابي"},
        {path : 'orders' , component : ProfileOrderdsComponent , title : "طلباتي"},
        {path : 'mysubscription' , component : ProfileMysubsriptionComponent , title : "اشتراكاتي"},
        {path : 'settings' , component : ProfileSettingsComponent , title : "الاعدادات"}
      ]},
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
