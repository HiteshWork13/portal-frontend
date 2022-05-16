import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Observer } from 'rxjs';
import { APP_CONST } from '../../constants/app.constant';
import { DOCUMENT_CONST } from '../../constants/notifications.constant';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  @Input() account_id;
  docList: any = [];
  documentForm: FormGroup;

  constructor(private documentService: DocumentService, private notification: NzNotificationService, private modalService: NzModalService,) { }

  ngOnInit(): void {
    this.getAllDocs(this.account_id);
    this.documentForm = new FormGroup({
      file: new FormControl(null),
    })
  }

  getAllDocs(account_id) {
    let data = {
      offset: 0,
      limit: 30,
      account_id: account_id
    }
    this.documentService.getAllDocuments(data).subscribe((result: any) => {
      if (result.success == true) {
        this.docList = result.data;
      }
    })
  }

  openFileBrowser(id) {
    if (document.getElementById(id)) {
      document.getElementById(id).click();
    }
  }

  handleChange(event) {
    let rules = {
      accept: ['application/pdf'],
      size: APP_CONST.MaxFileSizeInMB
    }
    const files = event.target.files;
    this.validateSizeBeforeUpload(files[0], rules).subscribe(isValid => {
      if (isValid) {
        this.documentForm.patchValue({
          file: files[0]
        })
      }
    })
  }

  validateSizeBeforeUpload = (file, rules) => {
    return new Observable((observer: Observer<boolean>) => {
      if (file) {
        let isAcceptable = false, isValidSize = false;
        if (rules.accept) {
          isAcceptable = rules.accept.indexOf(file.type) != -1 ? true : false
        }
        if (rules.size) {
          isValidSize = file.size / 1024 / 1024 < rules.size ? true : false
        }
        if (!isAcceptable) {
          this.notification.create('error', 'File Type Error', `File ${file.name} is not valid for upload.`, { nzDuration: 6000, nzPauseOnHover: true });
        }
        if (!isValidSize) {
          this.notification.create('error', 'File Size Error', `File ${file.name} is larger then ${APP_CONST.MaxFileSizeInMB}MB.`, { nzDuration: 6000, nzPauseOnHover: true });
        }
        observer.next(isAcceptable && isValidSize);
        observer.complete();
      }
    });
  };

  editDocument() {
    // 
  }

  showDeleteConfirm(id: any): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this document?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteDocument(id),
      nzCancelText: 'No',
      nzOnCancel: () => this.onClose(),
    });
  }

  deleteDocument(id) {
    this.documentService.deleteDocument(id).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.docList = this.docList.filter((element) => element['id'] !== id);
        this.notification.create('success', DOCUMENT_CONST.delete_doc_success, '', { nzDuration: 6000, nzPauseOnHover: true });
      }
    }, (_error) => {
      this.notification.create('error', DOCUMENT_CONST.delete_doc_error, '', { nzDuration: 6000, nzPauseOnHover: true });
    })
  }

  onClose() {
    this.modalService.closeAll();
  }
}
