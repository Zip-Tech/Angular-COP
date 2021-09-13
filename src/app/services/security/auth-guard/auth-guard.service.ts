import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@firebase/auth/auth.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private ngZone: NgZone) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.auth.user) {
      return true;
    }

    return this.auth.user$.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.ngZone.run(() => this.router.navigate(['login'])).then();
        }
      })
    );
  }
}
