import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CustomPaginatorIntl extends MatPaginatorIntl {
    constructor() {
        super();

        this.itemsPerPageLabel = 'Строк на странице:';
        this.nextPageLabel = 'Дальше';
        this.previousPageLabel = 'Назад';

        // @ts-ignore
        this.getRangeLabel = (page, pageSize, length) => {
            if (length === 0 || pageSize === 0) {
                return '0 из ' + length;
            }
            length = Math.max(length, 0);

            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return `${startIndex + 1} - ${endIndex} из ${length}`;
        };

        this.changes.next();
    }
}
