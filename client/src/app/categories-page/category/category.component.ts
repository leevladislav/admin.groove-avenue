import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {of, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {switchMap} from 'rxjs/operators';
import {MaterialService} from '../../shared/classes/material.service';
import {Category} from '../../shared/interfaces';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('input', {static: false}) inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview:any = '';
  isNew = true;
  category: Category;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.form.disable();

    const subscription = this.route.params.pipe(
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

          MaterialService.updateTextInputs();
        }

        this.form.enable();
      },
      error => MaterialService.toast(error.error.message)
    );

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  deleteCategory() {
    const decision = window.confirm(`Are you sure you want to delete category ${this.category.name} ?`);

    if (decision) {
      const subscription2 = this.categoriesService.delete(this.category._id).subscribe(
        response => MaterialService.toast(response.message),
        error => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/categories'])
      );

      this.subscriptions.push(subscription2);
    }
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

    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }

    const subscription3 = obs$.subscribe(
      category => {
        this.category = category;
        MaterialService.toast('Edited successfully');
        this.form.enable();
      },
      error => {
        MaterialService.toast(error.erroe.message);
        this.form.enable();
      }
    );

    this.subscriptions.push(subscription3);
  }
}
