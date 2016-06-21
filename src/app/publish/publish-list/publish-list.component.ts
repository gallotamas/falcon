import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublishCardComponent } from '../publish-card';
import { PublishingItemsService } from '../shared/publishing-items.service';
import { PublishingItem } from '../shared/publishing-item';

declare var componentHandler: any;

@Component({
  moduleId: module.id,
  selector: 'app-publish-list',
  templateUrl: 'publish-list.component.html',
  styleUrls: ['publish-list.component.css'],
  directives: [PublishCardComponent]
})
export class PublishListComponent implements OnInit {

  publishingItems: PublishingItem[];

  constructor(
    private _router: Router,
    private _publishingItemsService: PublishingItemsService) {}

  ngOnInit() {
    // init material design lite components.
    componentHandler.upgradeDom();

    this._publishingItemsService.getAll()
      .subscribe(publishingItems => this.publishingItems = publishingItems);
  }

  public onAddClicked() {
    this._router.navigate(['/publish/create']);
  }

}
