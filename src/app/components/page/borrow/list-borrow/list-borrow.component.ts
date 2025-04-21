import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-borrow',
  templateUrl: './list-borrow.component.html',
  styleUrls: ['./list-borrow.component.css']
})
export class ListBorrowComponent {

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
