import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@firebase/auth/auth.service';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/styles/angular-material.module';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularMaterialModule,
      ],
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
