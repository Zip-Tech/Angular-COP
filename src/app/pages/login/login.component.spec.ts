import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@firebase/auth/auth.service';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/styles/angular-material.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularMaterialModule,
      ],
      declarations: [LoginComponent],
      providers: [
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onSubmit call', async () => {
    spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it(`form should be invalid`, async() => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`form should be valid`, async() => {
    component.loginForm.controls['email'].setValue('asd@asd.com');
    component.loginForm.controls['password'].setValue('@Abc123456');
    expect(component.loginForm.valid).toBeTruthy();
  });

  // it('should call onButtonClick', fakeAsync(() => {
  //   spyOn(component, 'onSubmit');
  //   let btn = fixture.debugElement.queryAll(By.css('button'));
  //   for (let i = 0; i < btn.length; i++) {
  //     btn[i].triggerEventHandler('click', null);
  //   }

  //   tick(); // simulates the passage of time until all pending asynchronous activities finish
  //   fixture.detectChanges();
  //   expect(component.onSubmit).toHaveBeenCalled();
  // }));

  // it(`should call the onSubmit method`, async () => {
  //   spyOn(component, 'onSubmit');
  //   const button = fixture.debugElement.query(By.css('button'));
  //   button.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(component.onSubmit).toHaveBeenCalled();
  //   });
  // });

  // it('should click Set button', async () => {
  //   fixture.detectChanges();
  //   let buttonElement =
  //     fixture.debugElement.nativeElement.querySelector('.btn-block');

  //   buttonElement.click();
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(component.onSubmit).toHaveBeenCalled();
  //   });
  // });
});
