//import { questionnaire } from './../model/questionnaries.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
import { Patient } from 'src/model/patient.model';
import { ApiService } from '../app/services/api-service.service';
import FormJSon from 'src/assets/questionnaire.json';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public patientData= [];
  public form: FormGroup;  
  myForm: FormGroup;
  simpleForm = FormJSon;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) { 
    console.log(this.simpleForm); 
    this.myForm=this.fb.group({});
  }
  
  
  ngOnInit() {
    this.loadPatientData();
    
  } 
  loadPatientData() {
    this.apiService.getPatients().subscribe(
      (data:any) => {
        if(data) {
          if(data.entry && data.entry.length > 0){           
            data.entry.map((res)=>{
                if(res.resource.gender) {
                  let name = '';
                  let nameDetails = (res.resource.name && res.resource.name.length > 0) ? res.resource.name[0]: '' ;
                    if(nameDetails !==  '') {
                      let firstName = (nameDetails.family) ? nameDetails.family: '' ;
                      let lastName = (nameDetails.given && nameDetails.given.length > 0) ? nameDetails.given[0]: '';
                      let prefix = (nameDetails.prefix && nameDetails.prefix.length > 0) ? nameDetails.prefix[0]: '';
                      name = prefix + '' + firstName + ' ' + lastName;
                    } 
                    this.patientData.push({id:res.resource.id,gender:res.resource.gender,birthDate:res.resource.birthDate,name:name}) 
                }
            });
            console.log('patientData', this.patientData);
          }
        }
      }
    )
  }

}


