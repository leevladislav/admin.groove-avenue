import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrdersService} from '../shared/services/orders.service';
import {Filter, Order} from '../shared/interfaces';
import {untilDestroyed} from 'ngx-take-until-destroy';

const STEP = 4;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  offset = 0;
  limit = STEP;
  filter: Filter = {};
  loading = false;
  reloading = false;
  noMoreOrders = false;

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

    this.ordersService.fetch(params)
      .pipe(untilDestroyed(this))
      .subscribe(orders => {
        this.orders = this.orders.concat(orders);
        this.noMoreOrders = orders.length < STEP;
        this.loading = false;
        this.reloading = false;
      });
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  ngOnDestroy() {
  }
}
