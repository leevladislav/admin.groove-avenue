import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-modal-info',
    templateUrl: './modal-info.component.html',
    styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent implements OnInit {
    isArray = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.isArray = Array.isArray(this.data.message);
    }
}
