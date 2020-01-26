import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as localForage from 'localforage';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

localForage.config({
  driver: localForage.LOCALSTORAGE,
  name: 'boildplate',
  version: 1.0,
  storeName: 'boildplate-storage'
});
persistState({ include: ['state'], storage: localForage });
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
