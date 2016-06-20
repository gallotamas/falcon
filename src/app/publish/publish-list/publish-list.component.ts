import { Component, OnInit } from '@angular/core';
import { PublishCardComponent } from '../publish-card';
import { PublishingItemsService } from '../shared/publishing-items.service';
import { PublishingItem } from '../shared/publishing-item';

@Component({
  moduleId: module.id,
  selector: 'app-publish-list',
  templateUrl: 'publish-list.component.html',
  styleUrls: ['publish-list.component.css'],
  directives: [PublishCardComponent]
})
export class PublishListComponent implements OnInit {

  publishingItems: PublishingItem[];

  constructor(private _publishingItemsService: PublishingItemsService) {}

  ngOnInit() {
    this._publishingItemsService.getAll()
      .subscribe(publishingItems => this.publishingItems = publishingItems);
  }

}
