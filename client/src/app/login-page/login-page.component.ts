import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterialService} from '../shared/classes/material.service';
import {ModalInfoComponent} from '../entry-components/modal-info/modal-info.component';
import {MatDialog} from '@angular/material/dialog';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

    this.route.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params: Params) => {
        if (params['registered']) {
          MaterialService.toast('Registration success');
        } else if (params['accessDenied']) {
          MaterialService.toast('At first you have to registration');
        } else if (params['sessionFailed']) {
          MaterialService.toast('Please, login system back');
        }
      });
  }

  onSubmit() {
    this.form.disable();

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const data = this.form.value;

    this.auth.login(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => this.router.navigate(['/overview']),
        (error) => {
          this.dialog.open(ModalInfoComponent, {
            data: {
              title: 'Error!',
              message: error.error.message,
            },
            panelClass: ['primary-modal'],
            autoFocus: false,
          });

          this.form.enable();
        });
  }

  ngOnDestroy() {
  }
}
