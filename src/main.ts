import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { devTools } from '@ngneat/elf-devtools';
import { ApplicationRef } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .then((moduleRef) => {
    devTools({
      postTimelineUpdate: () => moduleRef.injector.get(ApplicationRef).tick(),
    });
  })
  .catch((err) => console.error(err));
