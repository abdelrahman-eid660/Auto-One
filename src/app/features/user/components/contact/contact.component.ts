import { Component } from '@angular/core';
import { AdminModule } from "../../../admin/admin.routes.module";

@Component({
  selector: 'app-contact',
  imports: [AdminModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
