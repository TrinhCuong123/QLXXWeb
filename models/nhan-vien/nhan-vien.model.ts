class NhanVienModel {
  id?: number;
  ten_nhanvien?: string;
  ngay_sinh?: Date;
  dien_thoai?: string;
  dia_chi?: string;
  tien_luong?: number;

  constructor(
    ten_nhanvien?: string,
    ngay_sinh?: Date,
    dien_thoai?: string,
    dia_chi?: string,
    tien_luong?: number,
  ) {
    this.ten_nhanvien = ten_nhanvien;
    this.ngay_sinh = ngay_sinh;
    this.dien_thoai = dien_thoai;
    this.dia_chi = dia_chi;
    this.tien_luong = tien_luong;
  }
}

export { NhanVienModel };
