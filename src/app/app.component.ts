import { Component } from '@angular/core';
import { UserQuery } from './SiteTests/components/customers/queries/users.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Test Platform';
  constructor(public userQuery: UserQuery) {
    
  }

}
