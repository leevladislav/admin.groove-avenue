import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from '../../../shared/services/positions.service';
import {Position} from '../../../shared/interfaces'
import {Subscription} from 'rxjs';
import {MaterialInstance, MaterialService} from '../../../shared/classes/material.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal', {static: false}) modalRef: ElementRef;

  positions: Position[] = [];
  loading = false;
  positionsId = null;
  modal: MaterialInstance;
  form: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    });

    this.loading = true;

    const subscription = this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      this.loading = false;
    });

    this.subscriptions.push(subscription);
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  onSelectPosition(position: Position) {
    this.positionsId = position._id;

    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onAddPosition() {
    this.positionsId = null;

    this.form.reset({name: '', cost: 1});
    this.modal.open();
    MaterialService.updateTextInputs();
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

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };

    const completed = () => {
      this.modal.close();
      this.form.reset({name: '', cost: 1});
      this.form.enable();
    };

    if (this.positionsId) {
      newPosition._id = this.positionsId;

      const subscription3 = this.positionsService.update(newPosition).subscribe(
        position => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions[index] = position;
          MaterialService.toast('Position successfully edited');
        },
        error => MaterialService.toast(error.error.message),
        completed
      );

      this.subscriptions.push(subscription3);
    } else {
      const subscription2 = this.positionsService.create(newPosition).subscribe(
        position => {
          MaterialService.toast('Position successfully added');
          this.positions.push(position);
        },
        error => MaterialService.toast(error.error.message),
        completed
      );

      this.subscriptions.push(subscription2);
    }
  }

  ngOnDestroy() {
    this.modal.destroy();

    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }
}
