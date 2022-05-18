import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})

export class DeviceListComponent implements OnInit {

  isConfirmLoading: boolean = false;
  deviceList: any = [
    { name: 'Device 1', id: 'dev1' },
    { name: 'XYZ', id: 'dev2' },
    { name: 'Asdf', id: 'dev3' },
    { name: 'Device 2', id: 'dev4' },
    { name: '12345', id: 'dev5' }
  ]

  constructor(private modalService: NzModalService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.isConfirmLoading = false;
    this.modalService.closeAll();
  }

  saveChanges() {
    // 
  }

  editDevice() {
    // 
  }

  deleteDevice(id) {
    // 
  }

  showDeleteConfirm(id: any): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this device?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteDevice(id),
      nzCancelText: 'No',
      // nzOnCancel: () => this.onClose(),
    });
  }
}
