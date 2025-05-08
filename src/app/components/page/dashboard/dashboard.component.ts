import { Component } from '@angular/core';
import { DeviceCategoryService } from 'src/app/core/services/device-category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  baseImageUrl=environment.baseApiUrl;
  summaries:any=[];
  constructor(private deviceCategoryService:DeviceCategoryService){

  }

  ngOnInit(){
    const request={
      pageIndex:1,
      pageSize:100
    }
    this.getSummaries(request);
  }

  getSummaries(request:any){
    this.deviceCategoryService.getDeviceCategorySummaryPaging(request).subscribe((res:any)=>{
      this.summaries=res.data.items;
    })
  }
}
