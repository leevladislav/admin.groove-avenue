import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-validator-message',
    templateUrl: './validator-message.component.html',
    styleUrls: ['./validator-message.component.scss']
})
export class ValidatorMessageComponent {
    @Input() field: FormControl;

    constructor() {
    }

    public validatorMessages(): any {
        const field = this.field;

        if (!field || !field.errors) {
            return false;
        }

        const errors = [];
        const config = {
            matDatepickerParse: 'Обязательное поле',
            required: 'Обязательное поле',
            requiredTrue: 'Значение должно быть больше нуля',
            email: 'Невалидный e-mail',
            pattern: 'Невалидный',
            passwordNotEqual: 'Пароли не совпадают',
            oldPasswordAreEqual: 'Новый пароль совпадает со старым',
        };

        if (field.errors.hasOwnProperty('custom')) {
            config['custom'] = (typeof field.errors.custom === 'string' && field.errors.custom.length) ?
                field.errors.custom :
                'Не соответствует формату';
        }

        if (field.errors.hasOwnProperty('minlength')) {
            const charEnding = this.wordEnding(field.errors.minlength.requiredLength);
            config['minlength'] = `Минимум ${field.errors.minlength.requiredLength} символ${charEnding}`;
        }

        if (field.errors.hasOwnProperty('maxlength')) {
            const charEnding = this.wordEnding(field.errors.maxlength.requiredLength);
            config['maxlength'] = `Максимум ${field.errors.maxlength.requiredLength} символ${charEnding}`;
        }

        if (field.errors.hasOwnProperty('min')) {
            config['min'] = `Минимальное число ${field.errors.min.min}`;
        }

        if (field.errors.hasOwnProperty('max')) {
            config['max'] = `Максимальное число ${field.errors.max.max}`;
        }

        Object.keys(field.errors).forEach((error: string) => {
            if (error === 'pattern') {
                const curPattern = field.errors.pattern.requiredPattern;
                for (const key in field.parent.controls) {
                    if (field.parent.controls.hasOwnProperty(key)) {
                        const obj = field.parent.controls[key];
                        if (obj.errors && obj.errors.pattern && obj.errors.pattern.requiredPattern === curPattern) {
                            if (key === 'newPassword' || key === 'password' || key === 'repeatNewPassword') {
                                errors.push(this.invalidPasswordMessage(obj.errors.pattern.actualValue));
                                break;
                            }

                            errors.push(`${config[error]} ${this.handlePatternNames(key)}`);
                            break;
                        }
                    }
                }
            } else {
                errors.push(config[error]);
            }
        });

        return errors;
    }

    private handlePatternNames(key) {
        let str = '';

        switch (key) {
            case 'phone':
                str = 'номер телефона';
                break;
            default:
                str = key;
                break;
        }

        return str;
    }

    private invalidPasswordMessage(text) {
        if (!/(?=.*[a-z])/.test(text)) {
            return 'Пароль должен содержать минимум 1 строчнную букву';
        }

        if (!/(?=.*[A-Z])/.test(text)) {
            return 'Пароль должен содержать минимум 1 заглавную букву';
        }

        if (!/(?=.*[0-9])/.test(text)) {
            return 'Пароль должен содержать хотя бы 1 цифру';
        }

        if (!/(?=.*[!@#$%^&*])/.test(text)) {
            return 'Пароль должен содержать минимум 1 спец. символ';
        }

        return 'Невалидный пароль';
    }

    private wordEnding(validatorLength) {
        let charEnding = 'ов';

        if (validatorLength % 10 === 1) {
            charEnding = '';
        }

        if (validatorLength % 10 > 1 && validatorLength % 10 < 5) {
            charEnding = 'а';
        }

        if (validatorLength % 100 > 10 && validatorLength % 100 < 19) {
            charEnding = 'ов';
        }

        return charEnding;
    }
}
