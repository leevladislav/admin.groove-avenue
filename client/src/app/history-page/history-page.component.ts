import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from '../shared/classes/material.service';
import {OrdersService} from '../shared/services/orders.service';
import {Subscription} from 'rxjs';
import {Filter, Order} from '../shared/interfaces';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip', {static: false}) tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;
  orders: Order[] = [];
  offset = 0;
  limit = STEP;
  filter: Filter = {};
  loading = false;
  reloading = false;
  noMoreOrders = false;

  private subscriptions: Subscription[] = [];

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    const subscription = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });

    this.subscriptions.push(subscription);
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
    this.tooltip.destroy();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
}
