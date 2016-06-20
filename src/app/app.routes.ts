import { provideRouter, RouterConfig } from '@angular/router';

import { PUBLISH_ROUTES }  from './publish/publish.routes';

export const routes: RouterConfig = [
  ...PUBLISH_ROUTES
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
