import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {OrderService} from './order.service';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy {
  isRoot: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';

    this.router.events
      .pipe(untilDestroyed(this))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isRoot = this.router.url === '/order';
        }
      });
  }

  ngOnDestroy() {
  }
}
