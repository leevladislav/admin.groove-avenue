import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterialService} from '../shared/classes/material.service';
import {ModalInfoComponent} from '../entry-components/modal-info/modal-info.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
    form: FormGroup;
    private subscriptions: Subscription[] = [];

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

        this.route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
                MaterialService.toast('Registration success');
            } else if (params['accessDenied']) {
                MaterialService.toast('At first you have to registration');
            } else if (params['sessionFailed']) {
                MaterialService.toast('Please, login system back');
            }
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = null;
    }

    onSubmit() {
        this.form.disable();

        if (this.form.invalid) {
            return this.form.markAllAsTouched();
        }

        const data = this.form.value;

        const subscription = this.auth.login(data).subscribe(
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

        this.subscriptions.push(subscription);
    }
}
