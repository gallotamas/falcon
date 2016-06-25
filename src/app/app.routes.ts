import { provideRouter, RouterConfig } from '@angular/router';

import { PUBLISH_ROUTES }  from './publish/publish.routes';
import { REACH_ROUTES }  from './reach/reach.routes';

export const routes: RouterConfig = [
  ...PUBLISH_ROUTES,
  ...REACH_ROUTES
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
