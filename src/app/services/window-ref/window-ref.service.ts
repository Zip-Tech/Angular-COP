import { Injectable } from '@angular/core';

/**
 * Return the global native browser window object
 */
function _window(): any {
  return window;
}

/**
 * Export a reference of the global native browser window object.
 */
@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  get nativeWindow(): any {
    return _window();
  }
}
