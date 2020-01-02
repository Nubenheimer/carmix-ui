import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  person: Person = new Person();

  form: FormGroup;

  firstName = new FormControl("", Validators.required);

  constructor(fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      "firstName": this.firstName,
      "lastName": ["", Validators.required],
      "office": ["", Validators.required],
      "phone": ["", Validators.required],
      "email": ["", Validators.email],
      "password": ["", Validators.required]
    });
  }
  onSubmit() {
    console.log("model-based form submitted");
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    this.person.firstName = this.form.get('firstName').value;
    this.person.lastName = this.form.get('lastName').value;
    this.person.email = this.form.get('email').value;
    this.person.phone = this.form.get('phone').value;
    this.http.post('http://127.0.0.1:8080/register/', JSON.stringify(this.person), options).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
  }

}
