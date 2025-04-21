import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css']
})
export class CreateDeviceComponent {

  categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
  ];
  @ViewChild('roomSelectorTemplate') roomSelectorTemplate!: TemplateRef<any>;
  modalRef!: BsModalRef;
  buildings: any[] = [];
  floors: any[] = [];
  rooms = [
    {
      id: 1,
      name: 'Phòng 101',
      description: 'Phòng học về lập trình web.',
      image: 'https://th.bing.com/th/id/R.a80fd92c173c2443c920e9aa0f48fe7f?rik=qUL0PIES1wwC8Q&riu=http%3a%2f%2ftuthucductri.edu.vn%2fmultidata%2fimg_2487.jpg&ehk=AeVMBsvB2EJNd7tbf0cPg61gr6WUP0VVaEwTotYl7XE%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      id: 2,
      name: 'Phòng 102',
      description: 'Phòng học về mạng máy tính.',
      image: 'https://th.bing.com/th/id/R.a80fd92c173c2443c920e9aa0f48fe7f?rik=qUL0PIES1wwC8Q&riu=http%3a%2f%2ftuthucductri.edu.vn%2fmultidata%2fimg_2487.jpg&ehk=AeVMBsvB2EJNd7tbf0cPg61gr6WUP0VVaEwTotYl7XE%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      id: 3,
      name: 'Phòng 103',
      description: 'Phòng học về cơ sở dữ liệu.',
      image: 'https://th.bing.com/th/id/R.a80fd92c173c2443c920e9aa0f48fe7f?rik=qUL0PIES1wwC8Q&riu=http%3a%2f%2ftuthucductri.edu.vn%2fmultidata%2fimg_2487.jpg&ehk=AeVMBsvB2EJNd7tbf0cPg61gr6WUP0VVaEwTotYl7XE%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      id: 4,
      name: 'Phòng 103',
      description: 'Phòng học về cơ sở dữ liệu.',
      image: 'https://th.bing.com/th/id/R.a80fd92c173c2443c920e9aa0f48fe7f?rik=qUL0PIES1wwC8Q&riu=http%3a%2f%2ftuthucductri.edu.vn%2fmultidata%2fimg_2487.jpg&ehk=AeVMBsvB2EJNd7tbf0cPg61gr6WUP0VVaEwTotYl7XE%3d&risl=&pid=ImgRaw&r=0'
    }
  ];

  selectedRoomName!: string;
  searchParams = {
    name: '',
    floorId: '',
    buildingId: ''
  };

  constructor(private modalService: BsModalService, private roomService: RoomService) { }

  ngOnInit() {
    this.loadBuildings();
    this.loadFloors(); // Assuming you have a method to load floors globally
  }

  imagePreview: string | ArrayBuffer | null = null; // Biến lưu ảnh preview

  onImageSelect(event: any): void {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
      };
      reader.readAsDataURL(file); 
    }
  }


  openModal() {
    this.modalRef = this.modalService.show(this.roomSelectorTemplate, {
      class: 'modal-lg modal-dialog-centered modal-dialog-scrollable'
    });
  }

  loadBuildings() {
    this.roomService.pagingBuildings().subscribe((data: any) => {
      this.buildings = data;
    });
  }

  loadFloors() {
    // Load floors similar to buildings if necessary
  }

  loadRooms() {
    this.roomService.paging(this.searchParams).subscribe((data: any) => {
      this.rooms = data;
    });
  }

  selectRoom(room: any) {
    this.selectedRoomName = room.name;
    this.modalRef.hide();
  }

  onSubmit() {
  }
}
