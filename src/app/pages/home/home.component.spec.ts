import { MockLocationStrategy } from '@angular/common/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@firebase/auth/auth.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from '@state/auth/auth.model';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/styles/angular-material.module';

import { HomeComponent } from './home.component';

class MockAuthService {
  user = { name: 'Test User' };
}

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

  it('should ngOnInit call', async () => {
    spyOn(component, 'subscribeToUser');
    component.ngOnInit();
    expect(component.subscribeToUser).toHaveBeenCalled();
  });

  // it('should subscribeToUser', async () => {
  //   spyOn(component, 'subscribeToUser');
  //   component.ngOnInit();
  //   expect(component.subscribeToUser).toHaveBeenCalled();
  // });

  // it('should', async () => {
  //   let button = fixture.debugElement.nativeElement.querySelector('#logout');
  //   button.click();
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(component.logout).toHaveBeenCalled();
  //   });
  // });

  // it(`should call the onSubmit method`, async(() => {
  //   spyOn(component, 'logout');
  //   let button = fixture.debugElement.query(By.css('#logout')).nativeElement;
  //   button.click();
  //   expect(component.logout).toHaveBeenCalled();
  // }));

  // it('should logout call', async () => {
  //   spyOn(component, 'logout');
  //   component.logout();
  //   expect(component.logout).toHaveBeenCalled();
  // });

  // it('should logout ', async () => {
  //   // test the before state, i assume the array will be empty beforehand
  //   expect(component.user).toBeTruthy()
  //   // invoke the function
  //   component.logout();
  //   // test the amount of seats generated
  //   expect(component.user).toBeFalsy()
  //   });

  // it('should call subscribeToUser and return user', async(() => {
  //   const response;
  //   spyOn(component, 'subscribeToUser').and.returnValue(of(response));
  //   component.subscribeToUser();
  //   fixture.detectChanges();
  //   expect(component.user).toEqual(response);
  // }));
});
