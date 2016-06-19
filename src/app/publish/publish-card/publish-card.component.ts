import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-publish-card',
  templateUrl: 'publish-card.component.html',
  styleUrls: ['publish-card.component.css']
})
export class PublishCardComponent implements OnInit {
  @Input() publishingItem;

  constructor() {}

  ngOnInit() {
  }

}
