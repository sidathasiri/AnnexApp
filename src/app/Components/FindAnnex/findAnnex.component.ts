import { Component } from '@angular/core';
import { CommonService } from '../../Services/common.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'find-annex',
  templateUrl: './findAnnex.component.html',
})
export class FindAnnexComponent implements OnInit {

  provinces: any[];
  currentProvince: any = {};

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getProvinces()
      .subscribe(res => this.provinces = res);
  }

  setProvince(province: string) {
    if (province == 'Any') {
      this.currentProvince = {};
    } else {
      for (var i = 0; i < this.provinces.length; i++) {
        if (this.provinces[i].name == province) {
          this.currentProvince = this.provinces[i];
        }
      }
    }
  }

}
