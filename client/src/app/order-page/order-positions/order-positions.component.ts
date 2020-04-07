import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PositionsService} from '../../shared/services/positions.service';
import {Observable} from 'rxjs';
import {Position} from '../../shared/interfaces';
import {map, switchMap} from 'rxjs/operators';
import {OrderService} from '../order.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {MatDialog} from '@angular/material/dialog';
import {ModalInfoComponent} from '../../entry-components/modal-info/modal-info.component';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit, OnDestroy {
  positions$: Observable<Position[]>;

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private order: OrderService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      untilDestroyed(this),
      switchMap(
        (params: Params) => {
          if (params.id) {
            return this.positionsService.fetch(params.id);
          }
        }
      ),
      map(
        (position: Position[]) => {
          return position.map(item => {
            item.quantity = 1;
            return item;
          });
        }
      )
    );
  }

  addToOrder(position: Position) {
    this.order.add(position);

    this.dialog.open(ModalInfoComponent, {
      data: {
        title: 'Thank You!',
        message: 'Your order successfully added!',
      },
      panelClass: ['primary-modal'],
      autoFocus: false,
    });
  }

  ngOnDestroy() {
  }
}
