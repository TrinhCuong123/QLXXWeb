class KhachHangModel{
  id?: number;
  ten_khachhang?: string;
  dien_thoai?: string;
  dia_chi?: string;
  thuong_hieu?: string;
  bienso_xe?: string;
  so_vin?: string;
  kinh_do?: number;
  vi_do?: number;
  lichSuThayThe?: [LichSuThayTheModel];
  // constructor(ten_khachhang: string, dien_thoai: string, dia_chi: string, thuong_hieu: string, bienso_xe: string, so_vin: string, kinh_do: number, vi_do: number){
  //   this.ten_khachhang = ten_khachhang
  //   this.dien_thoai = dien_thoai
  //   this.dia_chi = dia_chi
  //   this.thuong_hieu = thuong_hieu
  //   this.bienso_xe = bienso_xe
  //   this.so_vin = so_vin
  //   this.kinh_do = kinh_do
  //   this.vi_do = vi_do
  // }
}

class LichSuThayTheModel{
  id?: number;
  ngay_sua?: Date;
  so_km?: number;
  ghi_chu?: string;
  tong_chiphi?: number;
  da_thanhtoan?: boolean;
  khach_hang_id?: number;
  tungSuaChua?: PhuTungSuaChua[];
  tienCongSuaChua?: TienCongSuaChua[];
}

class PhuTungSuaChua {
  id?: number;
  hanghoa_id?: number;
  soluong_sudung?: number;
  lichsu_thaythe_id?: number;
  phuTung?: PhuTungModel 
}

class TienCongSuaChua {
  id?: number;
  noidung_suachua?: string;
  giathanh_suachua?: number;
  lichsu_thaythe_id?: number;
}

class PhuTungModel{
  id?: number;
  ngay_sanxuat?: Date;
  ngay_sudung?: Date;
  soluong_nhap?: number;
  soluong_conlai?: number;
  gia_nhap?: number;
  gia_ban?: number;
  loai_phutung_id?: number;
  loaiPhuTung?: LoaiPhuTungModel;
}

class LoaiPhuTungModel{
  id?: number;
  ma_phutung?: string;
  ten_phutung?: string;
}
export { KhachHangModel, LichSuThayTheModel, PhuTungSuaChua, TienCongSuaChua, PhuTungModel }
