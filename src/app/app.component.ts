import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserQuery } from './SiteTests/components/customers/queries/users.query';
import { UserService } from './SiteTests/components/customers/services/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Test Platform';
  constructor(public userQuery: UserQuery, private userService:UserService, private router: Router) { }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['test/login']);
  }
 }
