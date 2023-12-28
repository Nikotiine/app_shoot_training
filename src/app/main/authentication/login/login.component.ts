import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Routing } from '../../../core/app/enum/Routing.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected readonly Routing = Routing;
}
