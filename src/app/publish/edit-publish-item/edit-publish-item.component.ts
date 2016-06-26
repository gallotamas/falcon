import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublishingItemsService, PublishingItem } from '../shared/index';

declare var componentHandler: any;

@Component({
  moduleId: module.id,
  selector: 'app-edit-publish-item',
  templateUrl: 'edit-publish-item.component.html',
  styleUrls: ['edit-publish-item.component.css']
})
export class EditPublishItemComponent implements OnInit, AfterViewInit, OnDestroy {

  private _routeParamSubscription;

  isNewItem: boolean;

  // empty object is required for proper data binding.
  publishingItem = PublishingItem.createEmptyObject();

  public get tags(): string {
    return this.publishingItem.tags ? this.publishingItem.tags.join(' ') : '';
  }
  public set tags(value: string) {
    this.publishingItem.tags = _.filter(value.split(' '), item => item.trim() !== '');
  }

  networks = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'instagram', name: 'Instagram' }
  ];

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
      if (!id) {
        this.isNewItem = true;
      } else {
      this._publishingItemsService.get(id)
        .subscribe(publishingItem => this.publishingItem = publishingItem);
      }
   });
  }

  ngAfterViewInit() {
    // init material design lite components.
    // NOTE: the radio buttons are created in an ngFor so we have do this after the view init.
    componentHandler.upgradeDom();
  }

  ngOnDestroy() {
    // we have to unsubscribe because otherwise we would have a memory leak.
    this._routeParamSubscription.unsubscribe();
  }

  public onSubmit() {
    if (this.isNewItem) {
      this._publishingItemsService.post(this.publishingItem)
        .subscribe(publishingItem => {
          this.navigateToPublishPage();
        });
    } else {
      this._publishingItemsService.put(this.publishingItem)
        .subscribe(publishingItem => {
            this.navigateToPublishPage();
          });
    }
  }

  public navigateToPublishPage() {
    this._router.navigate(['/publish']);
  }

}
