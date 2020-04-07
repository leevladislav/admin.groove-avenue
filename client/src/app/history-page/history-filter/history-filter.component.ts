import {Component, EventEmitter, Output} from '@angular/core';
import {Filter} from '../../shared/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
  @Output() onFilter = new EventEmitter<Filter>();
  minDateFrom;
  maxDateFrom = moment();
  minDateTo;
  maxDateTo = moment();

  start;
  end;
  order: number;

  dateChanged(startDate?, endDate?) {
    this.minDateTo = startDate ? startDate : moment();
    this.maxDateFrom = endDate ? endDate : moment();

    if (startDate) {
      this.start = startDate;
    }

    if (endDate) {
      this.end = endDate;
    }
  }

  submitFilter() {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }

    if (this.start) {
      filter.start = this.start;
    }

    if (this.end) {
      filter.end = this.end;
    }

    this.onFilter.emit(filter);
  }
}
