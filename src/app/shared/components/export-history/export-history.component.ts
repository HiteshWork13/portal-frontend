import { Component, Input, OnInit } from '@angular/core';
import { historyTableConfigJSON } from '@configJson';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-export-history',
  templateUrl: './export-history.component.html',
  styleUrls: ['./export-history.component.scss']
})
export class ExportHistoryComponent implements OnInit {

  @Input() account_id: any;
  default_sort_property: string = 'length';
  default_sort_order: any = 'desc';
  pag_params: any = { pageIndex: 1, pageSize: 10 };
  historyList: any;
  historyTableJSON: any = JSON.parse(JSON.stringify((historyTableConfigJSON as any)));
  loading: boolean = true;
  totalData: number = 10;
  PageSize: number = 10;

  constructor(private modalService: NzModalService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getHistoryExport(this.pag_params, this.account_id);
  }

  onClose() {
    this.modalService.closeAll();
  }

  getHistoryExport(paginationParams = this.pag_params, account_id, sort_property = this.default_sort_property, sort_order = this.default_sort_order) {
    let offset = (paginationParams.pageIndex - 1) * paginationParams.pageSize;
    let api_body = {
      offset: offset,
      limit: paginationParams.pageSize,
      client_id: account_id
    }
    /* if (sort_order !== null) {
      sort_order = sort_order == 'ascend' ? 'ASC' : 'DESC';
      api_body['order'] = {
        [sort_property]: sort_order
      }
    } */
    this.accountService.exportHistory(api_body).then((response: any) => {
      if (response.success) {
        this.historyList = response.data;
        this.historyList.map((element, index) => {
          element['sr_no'] = index + 1;
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

  sortPackage(event) {
    this.getHistoryExport(this.pag_params, event.sort_property, event.sort_order);
  }

  indexChanged(event) {
    // 
  }
}
