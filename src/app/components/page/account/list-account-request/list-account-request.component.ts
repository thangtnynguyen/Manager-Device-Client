import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-account-request',
  templateUrl: './list-account-request.component.html',
  styleUrls: ['./list-account-request.component.css']
})
export class ListAccountRequestComponent {

   selectedItems:any=[];
    borrows:any=[];
    constructor(private router: Router) {
  
    }
  
      search:any={
      status:''
    };
  
    handleDelete(id:any){
  
    }
  
    toggleSelection(a:any){
  
    }
    isSelected(a:any){
      
    }
    selectAlls(a:any){
  
    }
}
