import { Component, OnInit } from '@angular/core';
import { historyTableConfigJSON } from '@configJson';
import { AccountService } from '@services';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-history-export',
  templateUrl: './history-export.component.html',
  styleUrls: ['./history-export.component.scss']
})
export class HistoryExportComponent implements OnInit {

  account_id: any = localStorage.getItem('current_user_id');
  default_sort_property: string = null;
  default_sort_order: any = null;
  pag_params: any = { pageIndex: 1, pageSize: 10 };
  historyList: any;
  historyTableJSON: any = JSON.parse(JSON.stringify((historyTableConfigJSON as any)));
  loading: boolean = true;
  totalData: number = 10;
  PageSize: number = 10;
  offset = (this.pag_params.pageIndex - 1) * this.pag_params.pageSize;
  user_data: any = JSON.parse(localStorage.getItem('current_user_details'));
  packageid = this.user_data.packageid;
  packageid_dr = this.user_data.packageid_dr;

  constructor(private modalService: NzModalService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getDefaults();
    this.getHistoryExport(this.pag_params, this.account_id);
  }

  getDefaults() {
    setTimeout(() => {
      if (this.packageid_dr !== 1) {
        this.historyTableJSON.Caption = "Export History Dr";
      }
      else {
        this.historyTableJSON.Columns = this.historyTableJSON.Columns.filter((column: any) => {
          return (column.property !== 'trial' && column.property !== 'app_type');
        });
      }
    }, 0);
  }

  onClose() {
    this.modalService.closeAll();
  }

  getHistoryExport(paginationParams = this.pag_params, account_id, sort_property = this.default_sort_property, sort_order = this.default_sort_order) {
    this.offset = (paginationParams.pageIndex - 1) * paginationParams.pageSize;
    let api_body = {
      offset: this.offset,
      limit: paginationParams.pageSize,
      client_id: account_id
    }
    if (sort_order !== null) {
      sort_order = sort_order == 'ascend' ? 'ASC' : 'DESC';
      api_body['order'] = {
        [sort_property]: sort_order
      }
    }
    if (this.packageid_dr !== 1) {
      this.historyDrApi(api_body);
    } else {
      this.historyApi(api_body);
    }
  }

  sortPackage(event) {
    this.getHistoryExport(this.pag_params, this.account_id, event.sort_property, event.sort_order);
  }

  indexChanged(event) {
    this.pag_params['pageIndex'] = event;
    this.getHistoryExport(this.pag_params, this.account_id);
  }


  historyApi(api_body) {
    this.accountService.exportHistory(api_body).then((response: any) => {
      if (response.success) {
        this.historyList = response.data;
        this.historyList.map((element, index) => {
          element['sr_no'] = this.offset + (index + 1);
        });
        this.loading = false;
        this.totalData = response?.counts;
        this.PageSize = response?.limit ? response?.limit : 10;
      }
    }, (error) => {
      this.loading = false;
      // this.notification.error(PACKAGE_CONST.get_package_error);
    })
  }

  historyDrApi(api_body) {
    this.accountService.exportHistoryDr(api_body).then((response: any) => {
      if (response.success) {
        this.historyList = response.data;
        this.historyList.map((element, index) => {
          element['sr_no'] = this.offset + (index + 1);
        });
        this.loading = false;
        this.totalData = response?.counts;
        this.PageSize = response?.limit ? response?.limit : 10;
      }
    }, (error) => {
      this.loading = false;
      // this.notification.error(PACKAGE_CONST.get_package_error);
    })
  }
}
