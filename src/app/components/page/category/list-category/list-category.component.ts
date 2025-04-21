import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {

  search:any={
    status:''
  };

  @ViewChild('createDeviceCategoryTemplate') createDeviceCategoryTemplate!: TemplateRef<any>;
  modalRef!: BsModalRef;
  deviceCategory = {
    name: '',
    description: '',
    imageFile: null
  };
  imagePreview: any='';

  constructor(private modalService: BsModalService) { }
  
  openModal() {
    this.modalRef = this.modalService.show(this.createDeviceCategoryTemplate, {
      class: 'modal-lg modal-dialog-centered modal-dialog-scrollable'
    });
  }

  onFileChange(event:any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log(this.deviceCategory);
    this.modalRef.hide();
  }

  handleDelete(id:any){
    
  }
}
