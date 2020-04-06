import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {ModalInfoComponent} from '../entry-components/modal-info/modal-info.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
    form: FormGroup;
    private subscriptions: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]],
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

        const subscription = this.auth.register(data).subscribe(
            () => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        registered: true
                    }
                });
            },
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
