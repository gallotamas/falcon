import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ImpressionsService, Impression, ImpressionSocketService } from './shared/index';
import { ReachGraphDirective } from './reach-graph.directive';

@Component({
  moduleId: module.id,
  selector: 'app-reach',
  templateUrl: 'reach.component.html',
  styleUrls: ['reach.component.css'],
  directives: [ReachGraphDirective],
  providers: [
    ImpressionsService,
    ImpressionSocketService]
})
export class ReachComponent implements OnInit, OnDestroy {
  impressions: Impression[];
  impressionsStream: Observable<Impression>;

  constructor(
    private _impressionsService: ImpressionsService,
    private _impressionSocketService: ImpressionSocketService) {}

  ngOnInit() {
    this._impressionsService.get()
      .subscribe(items => this.impressions = items);

    this.impressionsStream = this._impressionSocketService.created();
  }

  ngOnDestroy() {
    this._impressionSocketService.disconnect();
  }

}
