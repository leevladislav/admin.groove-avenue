import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from '../../shared/services/positions.service';
import {Position} from '../../shared/interfaces';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ModalConfirmComponent} from '../../entry-components/modal-confirm/modal-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';

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

  constructor(
    private dialog: MatDialog,
    private positionsService: PositionsService,
    private openModalService: OpenModalInfoService
  ) {
  }

  ngOnInit() {
    this.loading = true;

    this.positionsService.fetch(this.categoryId)
      .pipe(untilDestroyed(this))
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
      });
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    event.preventDefault();

    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Attention!',
        type: `Are you sure you want to delete position ${position.name} ?`,
      },
      panelClass: ['primary-modal'],
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.positionsService.delete(position).subscribe(
            response => {
              const index = this.positions.findIndex(p => p._id === position._id);
              this.positions.splice(index, 1);

              this.openModalService.openModal(response, null, response.message)
            },
            error => this.openModalService.openModal(null, error.error.message),
          );
        }
      });
  }

  ngOnDestroy() {
  }
}
