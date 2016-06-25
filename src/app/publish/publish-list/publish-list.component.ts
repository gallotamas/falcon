import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PublishCardComponent } from '../publish-card/index';
import { PublishingItemsService, PublishingItem, PublishSocketService } from '../shared/index';

declare var componentHandler: any;

@Component({
  moduleId: module.id,
  selector: 'app-publish-list',
  templateUrl: 'publish-list.component.html',
  styleUrls: ['publish-list.component.css'],
  directives: [PublishCardComponent],
  providers: [PublishSocketService]
})
export class PublishListComponent implements OnInit, OnDestroy {

  publishingItems: PublishingItem[];

  constructor(
    private _router: Router,
    private _publishingItemsService: PublishingItemsService,
    private _publishSocketService: PublishSocketService) {}

  ngOnInit() {
    // init material design lite components.
    componentHandler.upgradeDom();

    this._publishingItemsService.getAll()
      .subscribe(publishingItems => this.publishingItems = publishingItems);

    // Subscribe to the create event.
    this._publishSocketService.created()
      .subscribe(publishingItem => this.publishingItems.push(publishingItem));

    // Subscribe to the update event.
    this._publishSocketService.updated()
      .subscribe(publishingItem =>  {
        let index = _.findIndex(this.publishingItems, item => item.id === publishingItem.id);
        if (index !== -1) {
          this.publishingItems[index] = publishingItem;
        }
      });

    // Subscribe to the delete event.
    this._publishSocketService.deleted()
      .subscribe(id => _.remove(this.publishingItems, item => item.id === id));
  }

  ngOnDestroy() {
    this._publishSocketService.disconnect();
  }

  public onAddClicked() {
    this._router.navigate(['/publish/create']);
  }

}
