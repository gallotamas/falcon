import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PublishingItemsService } from './publish/shared/publishing-items.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [PublishingItemsService]
})
export class AppComponent {
}
