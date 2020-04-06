import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {OrdersService} from '../../shared/services/orders.service';
import {Order, OrderPosition} from '../../shared/interfaces';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit, OnDestroy {
  pending = false;

  constructor(
    private order: OrderService,
    private ordersService: OrdersService
  ) {
  }

  ngOnInit() {
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }

  submit() {
    this.pending = true;

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id;
        return item;
      })
    };

    this.ordersService.create(order)
      .pipe(untilDestroyed(this))
      .subscribe(
        newOrder => {
          // MaterialService.toast(`Order #${newOrder.order} successfully added!`);
          this.order.clear();
        },
        // error => MaterialService.toast(error.error.message),
        () => {
          // this.modal.close();
          this.pending = false;
        }
      );
  }

  ngOnDestroy() {
  }
}
