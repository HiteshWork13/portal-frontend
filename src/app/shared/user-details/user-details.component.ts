import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() row_data: any;
  constructor() { }

  ngOnInit(): void {
    this.accountDetails(this.row_data);
  }

  accountDetails(row) {
    let created_by = row.created_by.username
    let endUserData = [
      { field: "First Name", value: row.firstname },
      { field: "Last Name", value: row.lastname },
      { field: "Company", value: row.companyname },
      { field: "Street", value: row.enduser_street },
      { field: "State", value: row.enduser_state },
      { field: "Zip Code", value: row.postcode },
      { field: "Email Address", value: row.enduser_email },
      { field: "User Classification", value: row.enduser_classification },
      { field: "Country", value: row.country },
      { field: "Package", value: row.packageid },
    ];
    let resellerData = [
      { field: "First Name", value: row.reseller_firstname },
      { field: "Last Name", value: row.reseller_lastname },
      { field: "Company", value: row.reseller_company },
      { field: "Street", value: row.reseller_street },
      { field: "State", value: row.reseller_state },
      { field: "Zip Code", value: row.postcode },
      { field: "Email Address", value: row.reseller_email },
    ]
    this.row_data['created_by'] = created_by;
    this.row_data['end_user'] = endUserData;
    this.row_data['reseller'] = resellerData;
  }
}
