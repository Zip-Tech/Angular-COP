import { MockLocationStrategy } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AngularMaterialModule } from 'src/app/styles/angular-material.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let store: MockStore;
  const initialState = { loggedIn: false };
  let LocationStrategy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        AngularMaterialModule,
      ],
      declarations: [HomeComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        {
          provide: AuthService,
          useValue: {
            getUserDoc$: () => of('users'),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
