import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {of} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../../shared/services/categories.service';
import {switchMap} from 'rxjs/operators';
import {Category} from '../../../shared/interfaces';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {OpenModalInfoService} from '../../../shared/services/open-modal-info.service';
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmComponent} from "../../../entry-components/modal-confirm/modal-confirm.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('input', {static: false}) inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview: any = '';
  isNew = true;
  category: Category;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router,
    private openModalService: OpenModalInfoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });

    this.form.disable();

    this.route.params.pipe(
      untilDestroyed(this),
      switchMap(
        (params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.categoriesService.getById(params['id']);
          }

          return of(null);
        }
      )
    ).subscribe(
      (category: Category) => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            name: category.name
          });

          this.imagePreview = category.imageSrc;
        }

        this.form.enable();
      },
      error => this.openModalService.openModal(null, error.error.message)
    );
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  deleteCategory() {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Attention!',
        type: `Are you sure you want to delete category ${this.category.name} ?`,
      },
      panelClass: ['primary-modal'],
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.categoriesService.delete(this.category._id)
            .pipe(untilDestroyed(this))
            .subscribe(
              response => this.openModalService.openModal(response, null, response.message, 'categories'),
              error => this.openModalService.openModal(null, error.error.message)
            );
        }
      });
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    let obs$;

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.pipe(untilDestroyed(this))
      .subscribe(
        category => {
          this.category = category;
          this.openModalService.openModal(category, null, 'Category successfully edited');
          this.form.enable();
        },
        error => {
          this.openModalService.openModal(null, error.error.message);
          this.form.enable();
        }
      );
  }

  ngOnDestroy() {
  }
}
