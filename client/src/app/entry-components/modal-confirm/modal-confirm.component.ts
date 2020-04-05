import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }
}
