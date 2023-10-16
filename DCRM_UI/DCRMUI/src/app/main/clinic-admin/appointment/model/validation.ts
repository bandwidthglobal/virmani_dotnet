import { FormGroup, Validators } from '@angular/forms';
import { AppointmentFormService } from '../appointment-form/appointment-form.service';

export const FormTypeValidation: any = (formGroup: FormGroup) => {
    // formGroup.get('end_Time').disable({ emitEvent: false });
    // formGroup.get('number_Of_Slot').disable({ emitEvent: false });

    formGroup.get('start_Time').valueChanges.subscribe((start_Time) => {
        let slot_Time: any = formGroup.get('slot_Time').value;
        let no_of_slot: any;
        let IStartTimes: Array<any> = [];
        let index: number = 0;
        let end_Time: any = '';
        if (slot_Time) {
            no_of_slot = getSlotNumber(slot_Time);
            IStartTimes = getIStartTimes();
            index = IStartTimes.findIndex(e => e.id === start_Time);
            end_Time = IStartTimes[index + no_of_slot];
            formGroup.controls['end_Time'].setValue(end_Time.id);
            formGroup.controls['number_Of_Slot'].setValue(no_of_slot.toString());
        }

        // console.log('> IStartTimes ---> ', IStartTimes);
        // console.log('> start_Time ---> ', start_Time);
        // console.log('> slot_Time ---> ', slot_Time);
        // console.log('> no_of_slot ---> ', no_of_slot);
        // console.log('> index ---> ', index);
        // console.log('> end_Time ---> ', end_Time);
    });

    formGroup.get('slot_Time').valueChanges.subscribe((slot_Time) => {
        let start_Time: any = formGroup.get('start_Time').value;
        let no_of_slot: any = getSlotNumber(slot_Time);
        let IStartTimes: Array<any> = getIStartTimes();

        let index: number = IStartTimes.findIndex(e => e.id === start_Time);
        let end_Time: any = IStartTimes[index + no_of_slot];
        formGroup.controls['end_Time'].setValue(end_Time.id);
        formGroup.controls['number_Of_Slot'].setValue(no_of_slot.toString());

        // console.log('> IStartTimes ---> ', IStartTimes);
        // console.log('> start_Time ---> ', start_Time);
        // console.log('> slot_Time ---> ', slot_Time);
        // console.log('> no_of_slot ---> ', no_of_slot);
        // console.log('> index ---> ', index);
        // console.log('> end_Time ---> ', end_Time);
    });

};

export const getSlotNumber: any = (slot_Time: any) => {
    let no_of_slot: any;
    if (slot_Time.includes('15')) {
        no_of_slot = 1;
    } else if (slot_Time.includes('30')) {
        no_of_slot = 2;
    } else if (slot_Time.includes('45')) {
        no_of_slot = 3;
    } else if (slot_Time.includes('60')) {
        no_of_slot = 4;
    }
    return no_of_slot;
}

export const getIStartTimes: any = () => {
    return AppointmentFormService.prototype.getIStartTimes();
}