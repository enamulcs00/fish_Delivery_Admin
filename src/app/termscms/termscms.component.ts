import { Component, OnInit } from '@angular/core';
import { CmsService } from "src/app/services/cms.service";

@Component({
  selector: 'app-termscms',
  templateUrl: './termscms.component.html',
  styleUrls: ['./termscms.component.css']
})
export class TermscmsComponent implements OnInit {

  privacy:any;
  terms: any;

  constructor(private Srvc: CmsService) { }

  ngOnInit(): void {
    this.getData();
  }

  // Get Terms Data
  getData() {
    this.Srvc.getAll().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.terms = res?.data?.termsAndConditions;
      }
    });
  }

}
