import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../../../../core/services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ourservice-update',
  imports: [ReactiveFormsModule],
  templateUrl: './ourservice-update.component.html',
  styleUrl: './ourservice-update.component.css',
})
export class OurserviceUpdateComponent {
  id!: any;
  serviceForm!: FormGroup;
  constructor(
    private ourServiceServ: ServiceService,
    private fb: FormBuilder,
    private router: Router,
    private toster: ToastrService,
    private activedrouter: ActivatedRoute
  ) {
    this.id = activedrouter.snapshot.paramMap.get('id');
    ourServiceServ.getById(this.id).subscribe((data) => {
      this.serviceForm.patchValue(data);
    });
    this.createPricing();
  }
  createPricing() {
    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  onSubmit() {
    this.ourServiceServ.put(this.serviceForm.value , this.id).subscribe((data) => {
      this.toster.success('', 'تم تحديث الخدمة بنجاح', {
        timeOut: 3000,
      });
      this.router.navigateByUrl('/admin/ourservice-list');
    });
  }
}
