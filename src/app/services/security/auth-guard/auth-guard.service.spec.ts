import { MockLocationStrategy } from '@angular/common/testing';
import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@firebase/auth/auth.service';
import { of } from 'rxjs';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let LocationStrategy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Router, ActivatedRouteSnapshot, RouterStateSnapshot, NgZone],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        {
          provide: AuthService,
          useValue: {
            getUserDoc$: () => of('users'),
          },
        },
      ],
    });
    service = TestBed.inject(AuthGuardService);
  });
});
