import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  packageList: Array<any> = [
    {
      id: 1,
      label: "Pack 1",
      credit: 10000
    },
    {
      id: 2,
      label: "Pack 2",
      credit: 20000
    },
    {
      id: 3,
      label: "Pack 3",
      credit: 30000
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

  handleCredit(e) {
    const selectedPack = this.packageList.find(pack => pack.id == e)
    if (selectedPack) {
      this.userForm.controls.credits.setValue(selectedPack['credit'])
    }
  }
}
