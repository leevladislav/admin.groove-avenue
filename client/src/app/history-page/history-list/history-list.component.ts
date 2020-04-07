import {Component, Input, OnDestroy} from '@angular/core';
import {Order} from '../../shared/interfaces';
import {MatDialog} from '@angular/material/dialog';
import {HistoryInfoComponent} from './history-info/history-info.component';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy {
  @Input() orders: Order[];
  selectedOrder: Order;

  constructor(private dialog: MatDialog) {
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;

    this.dialog.open(HistoryInfoComponent, {
      data: {
        title: 'Order info',
        orderData: this.selectedOrder
      },
      panelClass: ['primary-modal'],
      autoFocus: false
    });
  }

  ngOnDestroy() {
  }
}
