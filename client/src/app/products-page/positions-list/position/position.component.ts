import {Component, OnDestroy, OnInit} from '@angular/core';
import {Position} from '../../../shared/interfaces';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PositionsService} from '../../../shared/services/positions.service';
import {ActivatedRoute} from '@angular/router';
import {OpenModalInfoService} from '../../../shared/services/open-modal-info.service';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit, OnDestroy {
  position: Position;
  form: FormGroup;
  categoriesId = null;
  positionsId = null;

  constructor(
    private fb: FormBuilder,
    private positionsService: PositionsService,
    private route: ActivatedRoute,
    private openModalService: OpenModalInfoService
  ) {
  }

  ngOnInit() {
    this.initForm();

    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        if (result) {
          this.categoriesId = result.id;
          this.positionsId = result.positionId;

          if (this.positionsId) {
            this.positionsService.getOnePosition(this.positionsId)
              .pipe(untilDestroyed(this))
              .subscribe((position: Position) => {
                if (position) {
                  this.position = {...position};

                  this.form.patchValue({
                    name: this.position.name,
                    description: this.position.description,
                    oldCost: this.position.oldCost,
                    cost: this.position.cost
                  });
                }
              });
          }
        }
      });
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      oldCost: [0, [Validators.required]],
      cost: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      description: this.form.value.description,
      oldCost: this.form.value.oldCost,
      cost: this.form.value.cost,
      category: this.categoriesId,
    };

    const completed = () => {
      this.form.reset({name: '', cost: 1});
      this.form.enable();
    };

    if (this.positionsId) {
      newPosition._id = this.positionsId;

      this.positionsService.update(newPosition)
        .pipe(untilDestroyed(this))
        .subscribe(
          position => {
            this.openModalService.openModal(position, null, 'Product successfully edited', 'categories');
          },
          error => this.openModalService.openModal(null, error.error.message),
          completed
        );
    } else {
      this.positionsService.create(newPosition)
        .pipe(untilDestroyed(this))
        .subscribe(
          position => {
            this.openModalService.openModal(position, null, 'Product successfully added', 'categories');
          },
          error => this.openModalService.openModal(null, error),
          completed
        );
    }
  }

  ngOnDestroy() {
  }
}
