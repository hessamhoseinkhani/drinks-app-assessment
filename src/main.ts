import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const x = "MY_API_KEY";

console.log(111, x)

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
