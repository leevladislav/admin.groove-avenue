import {Injectable, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalInfoComponent} from '../../entry-components/modal-info/modal-info.component';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class OpenModalInfoService implements OnDestroy {

    constructor(
        public dialog: MatDialog,
        private router: Router
    ) {
    }

    openModal(result, error, messageSuccess?, router?) {
        if (result && router) {
            const dialogRef = this.dialog.open(ModalInfoComponent, {
                data: {
                    title: 'Thank You!',
                    message: messageSuccess,
                },
                panelClass: ['primary-modal'],
                autoFocus: false
            });

            dialogRef.afterClosed()
                .pipe(untilDestroyed(this))
                .subscribe(() => this.router.navigate([router]));
        }

        if (result && !router) {
            this.dialog.open(ModalInfoComponent, {
                data: {
                    title: 'Thank You!',
                    message: messageSuccess,
                },
                panelClass: ['primary-modal'],
                autoFocus: false
            });
        }

        if (error) {
            this.dialog.open(ModalInfoComponent, {
                data: {
                    title: 'Error',
                    message: error,
                },
                panelClass: ['primary-modal'],
                autoFocus: false
            });
        }
    }

    ngOnDestroy() {
    }
}
