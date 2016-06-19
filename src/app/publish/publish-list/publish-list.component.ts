import { Component, OnInit } from '@angular/core';
import { PublishCardComponent } from '../publish-card';
import { PublishingItemsService } from './publishing-items.service';
import { Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-publish-list',
  templateUrl: 'publish-list.component.html',
  styleUrls: ['publish-list.component.css'],
  directives: [PublishCardComponent],
  providers: [PublishingItemsService]
})
export class PublishListComponent implements OnInit {

  publishingItems: Observable<any>;

  constructor(private _publishingItemsService: PublishingItemsService) {}

  ngOnInit() {
    this._publishingItemsService.getPublishingItems()
      .subscribe(publishingItems => this.publishingItems = publishingItems);
  }

}
