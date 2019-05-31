import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  select_type: boolean = false;
  type: string;
  records;
  config: any;
  showTable: boolean = false;  

  constructor(public fb: FormBuilder, private http: Http) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.records
    };
  }

  registrationForm = this.fb.group({
  })

  onSubmit() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('type', this.type);
    let requestOptions = new RequestOptions();
    requestOptions.search = params;
    if (this.type == undefined) {
      this.select_type = true
    } else {
      this.http.get('http://localhost:3000/api/v1/file_read',requestOptions)
        .subscribe(res =>
        this.records = res.json().records
      );
      this.showTable = true  
      this.select_type = false
    }
  }

  changeOption(e) {
    this.type = e.target.value
  }

  pageChanged(event){
    this.config.currentPage = event;
  }  
}
