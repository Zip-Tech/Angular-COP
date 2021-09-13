import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@firebase/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  focusEmail = false;
  focusPass = false;
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email must be valid (e.g. john@smith.com).' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'pattern',
        message: 'Password must have lowercase, UPPERCASE, number & special character.',
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
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'),
      ],
    ],
  });

  serverError = '';
  loading = false;

  constructor(private fb: FormBuilder, public auth: AuthService) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    this.auth.emailLogin(this.email?.value, this.password?.value);
  }

}
