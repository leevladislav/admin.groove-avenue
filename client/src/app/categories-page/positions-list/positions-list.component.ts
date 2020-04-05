import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from '../../shared/services/positions.service';
import {Position} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.scss']
})
export class PositionsListComponent implements OnInit, OnDestroy {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal', {static: false}) modalRef: ElementRef;

  positions: Position[] = [];
  loading = false;
  positionsId = null;
  modal: MaterialInstance;
  private subscriptions: Subscription[] = [];

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.loading = true;

    const subscription = this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      this.loading = false;
    });

    this.subscriptions.push(subscription);
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();

    const decision = window.confirm(`Are you sure you want to delete position ${position.name} ?`);

    if (decision) {
      const subscription4 = this.positionsService.delete(position).subscribe(
        response => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(index, 1);
          MaterialService.toast(response.message);
        },
        error => MaterialService.toast(error.error.message),
      );

      this.subscriptions.push(subscription4);
    }
  }

  onAddPosition() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }
}
