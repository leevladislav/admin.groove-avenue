import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MaterialInstance, MaterialService} from '../shared/classes/material.service';
import {OrderService} from './order.service';
import {Order, OrderPosition} from '../shared/interfaces';
import {OrdersService} from '../shared/services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal', {static: false}) modalRef: ElementRef;
  modal: MaterialInstance;
  isRoot: boolean;
  pending = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private order: OrderService,
    private ordersService: OrdersService
  ) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';

    const subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  submit() {
  this.pending = true;

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id;
        return item;
      })
    };

    const subscription1 = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Order #${newOrder.order} successfully added!`);
        this.order.clear();
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close();
        this.pending = false;
      }
    );

    this.subscriptions.push(subscription1);
  }
}
