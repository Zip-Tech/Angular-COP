import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-poc';
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(public authService: AuthService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: any) => (this.isAuthenticated = isAuthenticated)
    );
  }
  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }
  logout() {
    this.authService.logout('/');
  }
}
