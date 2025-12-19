import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocationService } from '../../../../core/services/location.service';
import { OrderProductsService } from '../../../../core/services/order-products.service';
import { PurchaseService } from '../../../../core/services/purchase.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  allData!: any;
  cartData!: any;
  cartItems!: any;
  totalPrice!: any;
  countries = [
    {
      code: 'EG',
      name: 'مصر',
      cities: ['القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'أسيوط'],
    },
    {
      code: 'SA',
      name: 'السعودية',
      cities: ['الرياض', 'جدة', 'مكة', 'المدينة', 'الدمام'],
    },
    {
      code: 'AE',
      name: 'الإمارات',
      cities: ['دبي', 'أبو ظبي', 'الشارقة', 'العين'],
    },
    {
      code: 'KW',
      name: 'الكويت',
      cities: ['الكويت', 'حولي', 'الفروانية', 'السالمية'],
    },
    { code: 'QA', name: 'قطر', cities: ['الدوحة', 'الخور', 'الريان'] },
    { code: 'BH', name: 'البحرين', cities: ['المنامة', 'المحرق'] },
    { code: 'OM', name: 'عمان', cities: ['مسقط', 'صلالة'] },
    { code: 'JO', name: 'الأردن', cities: ['عمّان', 'الزرقاء', 'إربد'] },
    {
      code: 'IQ',
      name: 'العراق',
      cities: ['بغداد', 'أربيل', 'البصرة', 'الموصل'],
    },
    { code: 'PS', name: 'فلسطين', cities: ['غزة', 'رام الله', 'نابلس'] },
    { code: 'LB', name: 'لبنان', cities: ['بيروت', 'طرابلس', 'صيدا'] },
    { code: 'SY', name: 'سوريا', cities: ['دمشق', 'حلب', 'حمص'] },
    { code: 'YE', name: 'اليمن', cities: ['صنعاء', 'عدن', 'تعز'] },
    { code: 'LY', name: 'ليبيا', cities: ['طرابلس', 'بنغازي'] },
    { code: 'TN', name: 'تونس', cities: ['تونس', 'صفاقس'] },
    { code: 'DZ', name: 'الجزائر', cities: ['الجزائر', 'وهران'] },
    {
      code: 'MA',
      name: 'المغرب',
      cities: ['الرباط', 'الدار البيضاء', 'مراكش'],
    },
    { code: 'MR', name: 'موريتانيا', cities: ['نواكشوط'] },
    { code: 'SD', name: 'السودان', cities: ['الخرطوم', 'أم درمان'] },

    { code: 'DE', name: 'ألمانيا', cities: ['برلين', 'ميونخ', 'هامبورغ'] },
    { code: 'FR', name: 'فرنسا', cities: ['باريس', 'مارسيليا', 'ليون'] },
    { code: 'IT', name: 'إيطاليا', cities: ['روما', 'ميلانو', 'نابولي'] },
    { code: 'ES', name: 'إسبانيا', cities: ['مدريد', 'برشلونة', 'فالنسيا'] },
    {
      code: 'GB',
      name: 'المملكة المتحدة',
      cities: ['لندن', 'مانشستر', 'ليفربول'],
    },
    { code: 'NL', name: 'هولندا', cities: ['أمستردام', 'روتردام'] },
    { code: 'SE', name: 'السويد', cities: ['ستوكهولم', 'غوتنبرغ'] },

    {
      code: 'US',
      name: 'الولايات المتحدة',
      cities: ['نيويورك', 'لوس أنجلوس', 'شيكاغو', 'ميامي'],
    },
  ];

  checkoutForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private orderProductsServ: OrderProductsService,
    private purchaseServ: PurchaseService,
    private toster: ToastrService,
    private router : Router
  ) {
    this.CartData();
    this.getDataForm();
  }
  CartData() {
    this.purchaseServ.get().subscribe((data: any) => {
      let totPrice = [];
      this.allData = data;
      this.cartData = data.flatMap((item: any) => {
        return item.items;
      });

      totPrice = data.forEach((data: any) => {
        this.totalPrice = data.total;
      });
    });
  }

  getDataForm() {
    this.checkoutForm = this.fb.group({
      company: [''],
      email: ['', [Validators.required , Validators.email]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      note: [''],
      paymentMethod: ['cash'],
      cardNumber: ['',Validators.maxLength(15)],
      cvv: ['',Validators.maxLength(3)],
      expireDate: [''],
    });
  }
  showVisa: boolean = false;
  filteredCities: string[] = [];
  onCountryChange(event: any) {
    const country = this.countries.find((c) => c.code === event.target.value);
    this.filteredCities = country?.cities || [];
  }
  toggleVisa(show: boolean) {
    this.showVisa = show;

    if (show) {
      this.checkoutForm.get('cardNumber')?.setValidators(Validators.required);
      this.checkoutForm.get('cvv')?.setValidators(Validators.required);
      this.checkoutForm.get('expireDate')?.setValidators(Validators.required);
    } else {
      this.checkoutForm.get('cardNumber')?.clearValidators();
      this.checkoutForm.get('cvv')?.clearValidators();
      this.checkoutForm.get('expireDate')?.clearValidators();
    }

    this.checkoutForm.get('cardNumber')?.updateValueAndValidity();
    this.checkoutForm.get('cvv')?.updateValueAndValidity();
    this.checkoutForm.get('expireDate')?.updateValueAndValidity();
  }
  submitOrder() {
    this.orderProductsServ
      .post({...this.checkoutForm.value,...this.allData })
      .subscribe((data: any) => {
        this.toster.success('', 'تم الشراء بنجاح✅', {
          positionClass: 'toast-top-right',
          timeOut: 3000
        });
      });
      setTimeout(() => {
        this.router.navigateByUrl('/user/profile/orders')
      }, 500);
  }
}
