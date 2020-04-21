import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-back-btn',
    templateUrl: './back-btn.component.html',
    styleUrls: ['./back-btn.component.scss']
})
export class BackBtnComponent implements OnInit {
    @Input() backUrl: string;
    @Input() text = 'Go back';

    constructor(
        private router: Router,
        private location: Location
    ) {
    }

    ngOnInit(): void {
    }

    back() {
        if (this.backUrl) {
            return this.router.navigate([this.backUrl]);
        }

        this.location.back();
    }
}
