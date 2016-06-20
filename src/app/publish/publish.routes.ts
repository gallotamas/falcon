import { RouterConfig } from '@angular/router';
import { PublishListComponent }  from './publish-list';
import { EditPublishItemComponent }  from './edit-publish-item';

export const PUBLISH_ROUTES: RouterConfig = [
  { path: '/publish', component: PublishListComponent, index: true },
  { path: '/publish/create', component: EditPublishItemComponent },
  { path: '/publish/:id', component: EditPublishItemComponent }
];
