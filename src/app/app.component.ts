import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PublishingItemsService } from './publish/shared/index';
import { SocketService } from './shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    PublishingItemsService,
    SocketService]
})
export class AppComponent {
}
