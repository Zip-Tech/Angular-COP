import { Injectable } from '@angular/core';

@Injectable()
export class LoggerServiceMock {
  error = jasmine.createSpy('error');
  warn = jasmine.createSpy('warm');
  log = jasmine.createSpy('log');
  debug = jasmine.createSpy('debug');

  constructor() {
  }
}
