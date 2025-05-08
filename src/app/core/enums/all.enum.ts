export enum AccountRequestStatus {
  Pending,
  Approved,
  Rejected,
}

export enum DeviceStatus {
  Available,    // Sẵn sàng sử dụng
  Using,        // Đang sử dụng
  Borrowed,     // Đang được mượn
  UnderRepair,  // Đang được sửa chữa
  Broken        // Hỏng, không thể sử dụng
}

export enum BorrowRequestStatus
{
    Pending,    // Chờ duyệt
    Approved,   // Đã duyệt
    Rejected,   // Từ chối
    Returned    // Đã trả
}
