import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublishingItemsService } from '../shared/publishing-items.service';
import { PublishingItem } from '../shared/publishing-item';

declare var componentHandler: any;

@Component({
  moduleId: module.id,
  selector: 'app-edit-publish-item',
  templateUrl: 'edit-publish-item.component.html',
  styleUrls: ['edit-publish-item.component.css']
})
export class EditPublishItemComponent implements OnInit, OnDestroy {

  private _routeParamSubscription;

  // empty object is required for proper data binding.
  publishingItem = PublishingItem.createEmptyObject();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _publishingItemsService: PublishingItemsService) {}

  ngOnInit() {
    // init material design lite components.
    componentHandler.upgradeDom();

    // url parameters are available through an observable.
    this._routeParamSubscription = this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this._publishingItemsService.get(id)
        .subscribe(publishingItem => this.publishingItem = publishingItem);
   });
  }

  ngOnDestroy() {
    // we have to unsubscribe because otherwise we would have a memory leak.
    this._routeParamSubscription.unsubscribe();
  }

  public onSubmit() {
    this._publishingItemsService.put(this.publishingItem)
      .subscribe(publishingItem => {
        this.publishingItem = publishingItem;
        this.navigateToPublishPage();
      });
  }

  public navigateToPublishPage() {
    this._router.navigate(['/publish']);
  }

}
