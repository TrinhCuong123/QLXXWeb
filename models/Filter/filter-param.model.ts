class FilterLoaiPhuTung{
  start?: number;
  length?: number;
  search?: Search;
}
class FilterKhachHang{
  start?: number;
  length?: number;
  search?: Search;
}

class FilterNhapHang{
  start?: number;
  length?: number;
  search?: Search;
}
class FilterChiTietNhapHang{
  start?: number;
  length?: number;
  hangnhap_id?: number;
  loaiphutung_id?: number;
}
class FilterLichSuHangHoa{
  start?: number;
  length?: number;
  loaiphutung_id?: number;
}

class FilterKhoHang{
  start?: number;
  length?: number;
  hangnhap_id?: number;
  loaiphutung_id?: number;
}

class FilterLichSuSuaXe{
  start?: number;
  length?: number;
  daThanhToan?: boolean;
  tuNgay?: Date;
  denNgay?: Date;
}

class Search{
  value?: string;
  regex?: boolean;
}

export { FilterKhachHang, FilterLichSuSuaXe, FilterLoaiPhuTung, FilterNhapHang, FilterChiTietNhapHang, FilterKhoHang, FilterLichSuHangHoa }