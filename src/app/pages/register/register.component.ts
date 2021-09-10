import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  validationMessages = {
    username: [{ type: 'required', message: 'Username is required.' }],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email must be valid (e.g. john@smith.com).' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'pattern',
        message:
          'Password must have lowercase, UPPERCASE, number & special character. ()',
      },
      {
        type: 'minlength',
        message: 'Password should have minimum of 8 characters.',
      },
      {
        type: 'maxLength',
        message: 'Password should have maximum of 25 characters.',
      },
    ],
  };
  signupForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.minLength(8),
        Validators.maxLength(25),
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ],
    ],
  });

  constructor(private fb: FormBuilder, public auth: AuthService) {}

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  async onSubmit() {
    this.auth.emailSignup(
      this.email?.value,
      this.password?.value,
      this.username?.value
    );
  }
}
