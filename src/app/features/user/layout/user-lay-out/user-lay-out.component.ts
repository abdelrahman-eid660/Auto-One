import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHeaderComponent } from "../../shared/user-header/user-header.component";
import { UserFooterComponent } from "../../shared/user-footer/user-footer.component";

@Component({
  selector: 'app-user-lay-out',
  imports: [RouterOutlet, UserHeaderComponent, UserFooterComponent],
  templateUrl: './user-lay-out.component.html',
  styleUrl: './user-lay-out.component.css'
})
export class UserLayOutComponent {

}
