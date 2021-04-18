import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * The global validation class
 * This class is used for form validation
 * From a global stand point
 */
export class Validation {

 /**
 * Validates the form value has a lower case letter
 */
  public static lowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const valid: boolean = new RegExp(/[a-z]/).test(control.value);
        return valid ? null : {lowervalidate: true};
      }
}

/**
 * Validates the form value has an upper case letter
 */
public static uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const valid: boolean = new RegExp(/[A-Z]/).test(control.value);
        return valid ? null : {uppervalidate: true};
      }
}

/**
 * Validates the form value has one or more special letters
 * @param allowed if the special character is allowed
 */
public static specialCharacterValidator(allowed: boolean = true): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const valid: boolean = new RegExp(/(?=.*[!@#$%^&*()])/).test(control.value);
        
        if (allowed) {
            return valid ? null : {specialvalidate: true};
        } else {
            return valid ? {specialvalidate: true} : null;
        }
      }
}

/**
 * Validates the form value has a one or more numbers
 */
public static numberValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const valid: boolean = new RegExp(/[0-9]/).test(control.value);
        return valid ? null : {numbervalidate: true};
      }
}

}