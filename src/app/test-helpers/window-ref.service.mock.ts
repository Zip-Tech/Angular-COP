import { Injectable } from '@angular/core';

@Injectable()
export class WindowRefServiceMock {
  constructor() {
  }

  nativeWindow = {
    location: {
      href: '/home'
    }
  };
}
