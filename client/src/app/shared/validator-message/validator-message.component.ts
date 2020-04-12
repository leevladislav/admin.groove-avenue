import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.scss']
})
export class ValidatorMessageComponent {
  @Input() field: FormControl;
  @Input() type: string;

  constructor() {
  }

  public validatorMessages(): any {
    const field = this.field;

    if (!field || !field.errors) {
      return false;
    }

    const errors = [];
    const config = {
      matDatepickerParse: 'Field is required',
      required: 'Field is required',
      requiredTrue: 'Value should be positive',
      email: 'Invalid e-mail',
      pattern: 'Invalid',
      passwordNotEqual: 'Passwords aren\'t equal',
      oldPasswordAreEqual: 'New password is the same as your old one',
    };

    if (field.errors.hasOwnProperty('custom')) {
      config['custom'] = (typeof field.errors.custom === 'string' && field.errors.custom.length) ?
        field.errors.custom :
        'Does not match to format';
    }

    if (field.errors.hasOwnProperty('minlength')) {
      config['minlength'] = this.type === 'answers' ?
        `Minimum ${field.errors.minlength.requiredLength} answers` :
        `Minimum length ${field.errors.minlength.requiredLength} symbols`;
    }

    if (field.errors.hasOwnProperty('maxlength')) {
      config['maxlength'] = `Maximum length ${field.errors.maxlength.requiredLength} symbols`;
    }

    if (field.errors.hasOwnProperty('min')) {
      config['min'] = `Minimum value ${field.errors.min.min}`;
    }

    if (field.errors.hasOwnProperty('max')) {
      config['max'] = `Maximum value ${field.errors.max.max}`;
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
}
