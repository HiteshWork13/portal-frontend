import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { packageTableDataJSON } from '@configJson';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PACKAGE_CONST } from '../../constants/notifications.constant';
import { NotificationService } from '../../services/notification.service';
import { PackageService } from '../../services/package.service';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  @ViewChild('actionTemplate') actionTemplate: TemplateRef<any>;
  @Input() account_id: any;
  loading: boolean = true;
  pag_params: any = { pageIndex: 1, pageSize: 10 };
  totalData: number = 10;
  PageSize: number = 10;
  search_keyword: any = '';
  default_sort_property: string = 'packagename';
  default_sort_order: any = 'desc';
  packageList: any;
  packageTableJSON: any = JSON.parse(JSON.stringify((packageTableDataJSON as any)));
  packageForm: FormGroup;

  constructor(private packageService: PackageService, private notification: NotificationService, private modalService: NzModalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDefaults();
    this.createForm();
    this.getPackages();
  }

  createForm() {
    this.packageForm = this.formBuilder.group(
      {
        packagename: [null, [Validators.required]],
        exportcost: [null, [Validators.required]],
        lengthcost: [null, [Validators.required]],
        totalcost: [null, [Validators.required]]
      })
  }

  getDefaults() {
    setTimeout(() => {
      this.packageTableJSON.Columns.map((column: any) => {
        if (column.property == 'actions') {
          column.actionTemplate = this.actionTemplate;
        }
      });
    }, 0);
  }

  getPackages(paginationParams = this.pag_params, sort_property = this.default_sort_property, sort_order = this.default_sort_order, search_query = this.search_keyword) {
    this.loading = true;
    let offset = (paginationParams.pageIndex - 1) * paginationParams.pageSize;
    let api_body = {
      userid: this.account_id,
      offset: offset,
      limit: paginationParams.pageSize,
      search_query: search_query
    }
    if (sort_order !== null) {
      sort_order = sort_order == 'ascend' ? 'ASC' : 'DESC';
      api_body['order'] = {
        [sort_property]: sort_order
      }
    }
    this.packageService.getAllPackages(api_body).then((response: any) => {
      if (response.success) {
        this.packageList = response.data;
        this.packageList.map((element, index) => {
          // let sr_no = paginationParams.pageIndex * paginationParams.pageSize;
          element['sr_no'] = index + 1;
        });
        this.loading = false;
        this.totalData = response?.counts;
        this.PageSize = response?.limit ? response?.limit : 10;
      }
    }, (_error) => {
      this.loading = false;
      this.notification.error(PACKAGE_CONST.get_package_error);
    })
  }

  sortPackage(event) {
    this.getPackages(this.pag_params, event.sort_property, event.sort_order);
  }

  openModal(temp: TemplateRef<{}>, state: any, item: any) {
    this.createForm();
    this.modalService.create({
      nzTitle: state == 'add' ? 'Add New Package' : 'Update Package',
      nzContent: temp,
      nzWidth: '60%',
      nzMaskClosable: false,
      nzAutofocus: null,
      nzFooter: [
        {
          label: state == 'add' ? 'Save' : 'Update',
          type: 'primary',
          onClick: (event) => {
            let formValue = this.packageForm.value;
            let valid: boolean = this.packageForm.valid;
            if (valid == true) {
              state == 'add' ? this.onSave(formValue) : this.updateUser(item.id, formValue);
              return true;
            } else {
              for (const i in this.packageForm.controls) {
                this.packageForm.controls[i].markAsDirty();
                this.packageForm.controls[i].updateValueAndValidity();
              }
              return false
            }
          },
        },
      ],
    });
  }

  onSave(value) {
    for (const i in this.packageForm.controls) {
      this.packageForm.controls[i].markAsDirty();
      this.packageForm.controls[i].updateValueAndValidity();
    }
    if (this.packageForm.valid) {
      const formObj = value;
      formObj.planid = "394105";
      formObj.userid = this.account_id;
      this.packageService.createPackage(formObj).then(
        (response: any) => {
          if (response.success) {
            this.packageList = [response['data'], ...this.packageList];
            this.notification.success(PACKAGE_CONST.create_package_success);
            this.modalService.closeAll();
          }
        }, (_error) => {
          this.notification.error(PACKAGE_CONST.create_package_error);
        })
    }
  }

  updateUser(id, value) {
    // 
  }

  showDeleteConfirm(row_id: any) {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this package?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deletePackage(row_id),
      nzCancelText: 'No',
    });
  }

  deletePackage(id) {
    this.packageService.deletePackage(id).then((response: any) => {
      if (response.success) {
        this.packageList = this.packageList.filter((element) => element['id'] !== id);
        this.packageList.map((element, index) => {
          element['sr_no'] = index + 1;
        });
        this.notification.success(PACKAGE_CONST.delete_package_success);
      }
    }, (_error) => {
      this.notification.error(PACKAGE_CONST.delete_package_error);
    })
  }

  indexChanged(event) {
    this.pag_params['pageIndex'] = event;
    this.getPackages(this.pag_params);
  }

  search(keyword) {
    this.search_keyword = keyword;
    this.getPackages(this.pag_params, this.default_sort_property, 'descend', this.search_keyword);
  }

  onSubmit() {
    // 
  }
}
