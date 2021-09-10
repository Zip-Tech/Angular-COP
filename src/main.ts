import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/performance';
import 'firebase/analytics';
import 'firebase/remote-config';
import 'firebase/database';

firebase.initializeApp(environment.config);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
