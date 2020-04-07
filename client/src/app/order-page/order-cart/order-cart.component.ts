import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {OrdersService} from '../../shared/services/orders.service';
import {Order, OrderPosition} from '../../shared/interfaces';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ModalConfirmComponent} from "../../entry-components/modal-confirm/modal-confirm.component";

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit, OnDestroy {
  pending = false;

  constructor(
    private dialog: MatDialog,
    private order: OrderService,
    private ordersService: OrdersService,
    private openModalService: OpenModalInfoService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  removePosition(orderPosition: OrderPosition) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Attention!',
        type: `Are you sure you want to delete position?`,
      },
      panelClass: ['primary-modal'],
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.order.remove(orderPosition);
        }
      });
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
          this.openModalService.openModal(newOrder, null, `Order #${newOrder.order} successfully added!`);
          this.order.clear();
        },
        error => this.openModalService.openModal(null, error.error.message),
        () => {
          this.pending = false;
          this.router.navigate(['/order']);
        }
      );
  }

  ngOnDestroy() {
  }
}
