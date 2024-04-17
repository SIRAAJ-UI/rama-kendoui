import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { AbstractControl, FormControl, FormControlName, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ResourceService } from '@csa/@services/resource.service';

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {
    public resources: any;

    constructor( private resourceService: ResourceService ,) { }
    getResourceData()
    {
        this.resources = this.resourceService.getResources();
    }
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
                        message:  this.resources?.Exceeds.replace("{0}",value).replace("{1}",maxLength) 
                    }
                }
            }

            return null; // validation passed
        }
    }

    validateAnticipatedUse(): ValidatorFn {
        return (control: AbstractControl): any => {
            const value: number = control.value;
            if (value==null) {
                return {
                    required: {
                        message: this.resources?.Required_Field.replace("{0}", "Anticipated Use") 
                    }
                }
            }
            return null; // validation passed
        }
    };

    

    customNumberValidator(): ValidatorFn {
        return (control: AbstractControl): any => {
            const value: number = control.value;
            if ((value < 0) || (value >100)){
                return {
                    required: {
                        message: this.resources?.Owner_Occupied_Range
                    }
                }
            }
            return null; // validation passed
        }
    };

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
                        message: this.resources?.ExactLength.replace("{0}",exactLength)  
                    }
                }
            }
            return null; // validation passed
        }
    }


    validateForm(form: { [key: string]: AbstractControl }): any[] {
        const validationErrors: string[] = [];
        Object.keys(form).forEach((controlName: string) => {
            const control: AbstractControl = form[controlName];
            // && (control.dirty || control.touched)
            if (control && control.invalid) {
                Object.keys(control.errors).forEach((errorName: string) => {
                    validationErrors.push(control.errors[errorName].message)
                })
            }
        });

        return validationErrors;
    }
}
