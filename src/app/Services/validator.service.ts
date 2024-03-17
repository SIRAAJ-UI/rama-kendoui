import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { AbstractControl, FormControlName, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {

    constructor() { }

    validateMaxLength(maxLength: number): ValidatorFn {
        return (control: AbstractControl): any => {
            if (Validators.required(control)) {

                // If the control is required and empty, don't perform maxLength valiation
                return null;
            }

            const value: string = control.value;
            if (value && value.length > maxLength) {
                return {
                    maxLength: {
                        requiredLength: maxLength,
                        actualLength: value.length,
                        message: 'Max length ' + maxLength + 'exceed'
                    }
                }
            }

            return null; // validation passed
        }
    }

    validateExactLength(exactLength: number): ValidatorFn {
        return (control: AbstractControl): any => {
            if (Validators.required(control)) {
                // If the control is required and empty, don't perform maxLength valiation
                return null;
            }

            const value: string = control.value;
            if (value && value.length > exactLength) {
                return {
                    exactLength: {
                        requiredLength: exactLength,
                        actualLength: value.length,
                        message: 'Need to be ' + exactLength + 'characters'
                    }
                }
            }

            return null; // validation passed
        }
    }
    
  
    validateForm(form: { [key: string]: AbstractControl}): any[] {
        const validationErrors: string[] = [];
        Object.keys(form).forEach((controlName: string) => {
            const control: AbstractControl = form[controlName];
            // && (control.dirty || control.touched)
            if(control && control.invalid ) {
                Object.keys(control.errors).forEach((errorName: string) => {
                    console.log(control.errors[errorName].message)
                    if(!control.errors[errorName].message){
                        // validationErrors.push("Required Field")
                    } else {
                        validationErrors.push(control.errors[errorName].message)
                    }
                })
            }
        });

        return validationErrors;
    }
}
