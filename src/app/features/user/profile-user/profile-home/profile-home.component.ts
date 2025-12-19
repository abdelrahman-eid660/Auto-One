import { map } from 'rxjs/operators';
import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderProductsService } from '../../../../core/services/order-products.service';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-profile-home',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './profile-home.component.html',
  styleUrl: './profile-home.component.css',
})
export class ProfileHomeComponent {
  profileForm!: FormGroup;
  selectedImage!: any;
  avatar!: any;
  editing = false;
  users: any;
  UserID!: any;
  userID!: any;
  userData!: any;
  myorders!: any;
  mysubscription!: any;
  oldEmail!: string;
  idOrder!: any;
  idSubscription!: any;
  constructor(
    private fb: FormBuilder,
    private userServs: UsersService,
    private orderServ: OrderProductsService,
    private subscriptionServ: SubscriptionsService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getData();
    this.loadData();
  }
  getData() {
    const data = localStorage.getItem('user');
    this.userData = data ? JSON.parse(data) : null;
    this.oldEmail = this.userData?.email;
    this.profileForm.patchValue(this.userData);
    if (this.gender == 'male') {
      this.avatar =
        this.userData.avatar || 'https://i.postimg.cc/XqCYPKKh/user_men.jpg';
    } else {
      this.avatar =
        this.userData.avatar || 'https://i.postimg.cc/hvdtY88N/user_women.png';
    }
    this.userServs.get().subscribe((data: any) => {
      this.users = data.find((user: any) => {
        return user.email == this.oldEmail;
      });
    });
  }
  loadData() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.orderServ.get().subscribe((data: any) => {
      this.myorders = data.filter((order: any) => {
        return order.email == user.email;
      });
      this.idOrder = this.myorders[0]?.id;
      this.myorders = [...this.myorders].map((item: any) => {
        return item['0'].items;
      });
    });
    this.subscriptionServ.get().subscribe((data: any) => {
      this.mysubscription = data.filter((sub: any) => {
        return sub.email == user.email;
      });

      this.idSubscription = this.mysubscription[0]?.id;
    });
  }
  buildForm() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      avatar: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      paymentMethod: ['cash'],
      cardNumber: [''],
      cvv: [''],
      expireDate: [''],
    });
  }
  get gender() {
    return this.profileForm.get('gender')?.value;
  }

  toggleEdit() {
    this.editing = !this.editing;
    if (!this.editing) {
    }
  }

  selectImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.toaster.error('الملف ليس صورة مدعومة');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.toaster.error('الملف كبير جداً — اختار صورة أصغر من 2MB');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.avatar = reader.result as string;
      this.profileForm.patchValue({ avatar: this.avatar });
    };

    reader.onerror = (err) => {
      console.error('FileReader error', err);
      this.toaster.error('حدث خطأ أثناء قراءة الملف');
    };

    reader.readAsDataURL(file);
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const dataUpdate = this.profileForm.value;
    const newEmail = dataUpdate.email;
    if (newEmail !== this.oldEmail) {
      this.orderServ
        .patch({ email: newEmail }, this.idOrder)
        .subscribe((data: any) => {});
      this.subscriptionServ
        .patch({ email: newEmail }, this.idSubscription)
        .subscribe((data: any) => {});
    }
    this.userServs.patch(dataUpdate, this.users.id).subscribe((data)=>{}),
      localStorage.setItem('user', JSON.stringify(dataUpdate));
  }
}
