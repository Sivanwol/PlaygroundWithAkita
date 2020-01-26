import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable , combineLatest} from 'rxjs';
import { UserQuery } from '../queries/users.query';
import { map , take } from 'rxjs/operators';
import { selectPersistStateInit } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userQuery: UserQuery, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return combineLatest(this.userQuery.isLoggin(),
    selectPersistStateInit()).pipe(
      map(([user]) => {
        if (!user) {
          this.router.navigate(['test/login']);
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

}
