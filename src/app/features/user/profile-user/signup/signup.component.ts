import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../../core/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  users: any[] = [];
  passwordMatchValidator(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { mismatch: true };
  }
  signupForm!: FormGroup;
  profileImg: string | null = null;
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
  filteredCities: string[] = [];
  onCountryChange(event: any) {
    const country = this.countries.find((c) => c.code === event.target.value);
    this.filteredCities = country?.cities || [];
  }
  loading = false;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loadData();
  }
  loadData() {
    this.userService.get().subscribe((data: any) => {
      this.users = data.map((em: any) => {
        return em.email;
      });
    });
    this.signupForm = this.fb.group({
      avatar: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9+\-\s]{6,20}$/)],
      ],
      dob: ['', [Validators.required]],
      gender: ['male', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: this.passwordMatchValidator }
      ),
    });
  }
  onFileChange(e: any) {
    const file: File = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImg = reader.result as string;
      this.signupForm.patchValue({ avatar: this.profileImg });
    };
    reader.readAsDataURL(file);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  get pg() {
    return this.signupForm.get('passwordGroup') as FormGroup;
  }
  submit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.toastr.error('', 'الرجاء إكمال الحقول المطلوبة');
      return;
    }

    const payload = {
      avatar: this.signupForm.value.avatar || null,
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      phone: this.f['phone'].value,
      dob: this.f['dob'].value,
      gender: this.f['gender'].value,
      country: this.f['country'].value,
      city: this.f['city'].value,
      password: this.pg.get('password')?.value,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    const userExist = this.users.find((user) => user == payload.email);
    if (userExist) {
      this.toastr.warning('', 'هذا الايميل موجود مسبقا', {
        timeOut: 3000,
      });
      return;
    } else {
      this.loading = true;
      this.userService.post(payload).subscribe({
        next: (res) => {
          this.loading = false;
          this.toastr.success('', 'تم إنشاء الحساب بنجاح');
          this.router.navigateByUrl('/user/login');
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
          this.toastr.error('', 'حدث خطأ أثناء التسجيل');
        },
      });
    }
  }
}
