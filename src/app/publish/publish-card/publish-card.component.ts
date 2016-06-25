import { Component, OnInit, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PublishingItemsService, PublishingItem } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-publish-card',
  templateUrl: 'publish-card.component.html',
  styleUrls: ['publish-card.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class PublishCardComponent implements OnInit {
  @Input() publishingItem: PublishingItem;

  constructor(private _publishingItemsService: PublishingItemsService) {}

  ngOnInit() {
  }

  public delete() {
    // NOTE: normally we would have to emit an event and notify the container element about
    // the deletion but since we are using websockets, the server will send a notification instead.
    this._publishingItemsService.delete(this.publishingItem);
  }

}
