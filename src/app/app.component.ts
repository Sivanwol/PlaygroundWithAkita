import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { UserQuery } from "./SiteTests/components/customers/queries/users.query";
import { UserService } from "./SiteTests/components/customers/services/users.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Test Platform";
  items: MenuItem[];
  constructor(
    public userQuery: UserQuery,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: "Route Testing",
        icon: "pi pi-pw pi-file",
        items: [
          {
            label: "Page 1",
            routerLink: ["/test/page1"],
            routerLinkActiveOptions: "active",
            icon: "pi pi-fw pi-angle-double-right"
          },
          { separator: true },
          {
            label: "Page 2",
            routerLink: ["/test/page2"],
            routerLinkActiveOptions: "active",
            icon: "pi pi-fw pi-angle-double-right"
          }
        ]
      },
      {
        label: "Show Case",
        icon: "pi pi-pw pi-desktop",
        routerLinkActiveOptions: "active",
        routerLink: ["/test/showcase"]
      }
    ];
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(["test/login"]);
  }
}
