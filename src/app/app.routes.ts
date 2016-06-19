import { provideRouter, RouterConfig } from '@angular/router';

import { PublishListComponent }  from './publish/publish-list';

export const routes: RouterConfig = [
  { path: '/publish', component: PublishListComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
