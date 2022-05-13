import { Component, Input, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  @Input() account_id;
  docList: any = [
    { document_name: "asdf.com", document_id: "asdf" },
    { document_name: "qwerty.com", document_id: "qwerty" },
    { document_name: "sgyurff.com", document_id: "sgyurff" },
    { document_name: "feyiooo.com", document_id: "feyiooo" },
    { document_name: "opodhfyr.com", document_id: "opodhfyr" },
  ];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.getAllDocs(this.account_id);
  }

  getAllDocs(account_id) {
    let data = {
      offset: 10,
      limit: 30,
      account_id: account_id
    }
    this.documentService.getAllDocuments(data).subscribe((result: any) => {
      console.log('document result: ', result);
      if (result.success == true) {
        // this.docList = result.data;
      }
    })
  }

  openFileBrowser(event) {
    // 
  }

  handleChange(event) {
    // 
  }
}
