import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatHint } from '@angular/material/form-field';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
