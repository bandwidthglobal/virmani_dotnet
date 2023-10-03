// edit-patient.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientEditService } from './patient-edit.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss'],
})
export class PatientEditComponent implements OnInit {
  patientId: number;
  patientData: any;
  editPatientForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private patientEditService: PatientEditService,
    private fb: FormBuilder
  ) {}

  imagePreviewUrl: string = ''; 

  // Define the convertToBase64 method
  convertToBase64(event: any) {
    // Logic for converting the selected image to base64 goes here
  }

  // Define your form group and other properties here
  base64Image: string = ''; 

  items: any[] = []; 

  // Define the error property
  error: string | null = null;

  // Define the addNewItem method
  addNewItem() {
    this.items.push({
        type: '',
        name: '',
        amount: null,
        balance_spent: null,
        balance_amount: null
    });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  // Define the saveData method
  saveData() {
    // Logic for saving data goes here
  }

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id');
    this.loadPatientData();
    this.createForm();
  }

  loadPatientData(): void {
    this.patientEditService.getPatient(this.patientId).subscribe((data) => {
      this.patientData = data;
      this.editPatientForm.patchValue(this.patientData); // Populate the form with patient data
    });
  }

  createForm(): void {
    this.editPatientForm = this.fb.group({
      // Define form controls corresponding to patient data fields
      // For example: name, gender, date of birth, etc.
    });
  }

  onSubmit(): void {
    const updatedPatientData = this.editPatientForm.value;
    this.patientEditService
      .updatePatient(this.patientId, updatedPatientData)
      .subscribe((response) => {
        // Handle the response as needed
      });
  }
}
