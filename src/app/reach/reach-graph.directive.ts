import { Directive, OnInit, OnChanges, Input, ElementRef, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as d3 from 'd3';
import { Impression } from './shared/index';

class Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Directive({
  // This is a DOM manipulating directive with input parameters.
  // In this case it is OK that we don't follow directive naming conventions,
  // because this shouldn't be an attribute directive that changes the behavior of an element.
  // It should be a DOM manipulating 'element' directive that can be customized with other attributes.
  selector: 'app-reach-graph' // tslint:disable-line
})
export class ReachGraphDirective implements OnInit, OnChanges {
  @Input() data: any[];
  @Input() updateStream: Observable<Impression>;
  @Input() width: number;
  @Input() height: number;

  private _margin: Margin;
  private _width: number;
  private _height: number;
  private _x: d3.time.Scale<number, number>;
  private _y: d3.scale.Linear<number, number>;
  private _color: d3.scale.Ordinal<string, string>;
  private _xAxis: d3.svg.Axis;
  private _yAxis: d3.svg.Axis;
  private _line: d3.svg.Line<[number, number]>;
  private _svg: d3.Selection<any>;

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    this._margin = { top: 20, right: 80, bottom: 30, left: 80 };
    this._width = (this.width || 960) - this._margin.left - this._margin.right;
    this._height = (this.height || 500) - this._margin.top - this._margin.bottom;

    this._x = d3.time.scale().range([0, this._width]);
    this._y = d3.scale.linear().range([this._height, 0]);

    this._color = d3.scale.category10();

    this._xAxis = d3.svg.axis().scale(this._x).orient('bottom');
    this._yAxis = d3.svg.axis().scale(this._y).orient('left');

    this._line = d3.svg.line()
      .interpolate('monotone')
      .x(d => { return this._x((<any>d).timestamp); })
      .y(d => { return this._y((<any>d).impressions); });

    let element = this._elementRef.nativeElement;
    this._svg = d3.select(element).append('svg')
      .attr('width', this._width + this._margin.left + this._margin.right)
      .attr('height', this._height + this._margin.top + this._margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + this._margin.left + ',' + this._margin.top + ')');

    if (this.updateStream) {
      this.updateStream.subscribe(impression => {
        this.data.push(impression);
        // clear the graph and rerender it with the new data.
        d3.selectAll('svg > g > *').remove();
        this.render();
      });
    }
  }

  ngOnChanges(changes: { [key: string]: SimpleChange; }) {
    if (!changes['data'].isFirstChange()) {
      this.render();
    }
  }

  private render() {
    this._color.domain(d3.keys(this.data[0]).filter(function(key) { return key !== 'timestamp'; }));

    this.data.forEach(d => {
      d.timestamp = new Date(d.timestamp);
    });

    let postImpressions = this._color.domain().map(name => {
      return {
        name: name,
        values: this.data.map(function(d) {
          return { timestamp: d.timestamp, impressions: +d[name] };
        })
      };
    });

    this._x.domain(d3.extent(this.data, d => { return d.timestamp; }));

    this._y.domain([
      d3.min(postImpressions, c => { return d3.min(c.values, v => { return v.impressions; }); }),
      d3.max(postImpressions, c => { return d3.max(c.values, v => { return v.impressions; }); })
    ]);

    this._svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this._height + ')')
        .call(this._xAxis);

    this._svg.append('g')
        .attr('class', 'y axis')
        .call(this._yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Post impressions');

    let postImpression = this._svg.selectAll('.impression')
        .data(postImpressions)
      .enter().append('g')
        .attr('class', 'impression');

    postImpression.append('path')
        .attr('class', 'line')
        .attr('d', d => { return this._line((<any>d).values); })
        .style('stroke', d => { return this._color(d.name); });

    postImpression.append('text')
        .datum(d => { return {name: d.name, value: d.values[d.values.length - 1]}; })
        .attr('transform', d => { return 'translate(' + this._x(d.value.timestamp) + ',' + this._y(d.value.impressions) + ')'; })
        .attr('x', 3)
        .attr('dy', '.35em')
        .text(d => { return d.name; });
  }

}
