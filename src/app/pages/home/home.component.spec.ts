import { MockLocationStrategy } from '@angular/common/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@firebase/auth/auth.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
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

  it('should ngOnInit call', async () => {
    spyOn(component, 'subscribeToUser');
    component.ngOnInit();
    expect(component.subscribeToUser).toHaveBeenCalled();
  });

  // Expected spy logout to have been called.

  // it(`should call the logout method`, async () => {
  //   spyOn(component, 'logout');
  //   const button = fixture.debugElement.query(By.css('#logout'));
  //   button.triggerEventHandler('click', {});
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(component.logout).toHaveBeenCalled();
  //   });
  // });

  // it('should test click', () => {
  //   spyOn(component, 'logout');
  //   // fixture.debugElement.query(By.css('[data-testid="logout"]')).nativeElement.click();
  //     const button = fixture.debugElement.query(By.css('[data-testid="logout"]'));
  //   button.triggerEventHandler('click', {});
  //   expect(component.logout).toHaveBeenCalled();
  // });
});
