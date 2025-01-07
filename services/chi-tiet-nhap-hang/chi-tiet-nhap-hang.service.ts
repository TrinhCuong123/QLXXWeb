import type { FilterChiTietNhapHang } from "~/models/Filter/filter-param.model";
import { BaseService } from "../base.service";
import type { ChiTietHangNhapModel } from "~/models/chi-tiet-hang-nhap/chi-tiet-hang-nhap.model";
import type { RestData, RestError, RestPagedDataTable } from "~/models/base-response.model";

const URL = "/api/chitiet-nhaphang";
class _ChiTietNhapHangService extends BaseService{
  async getDatatable(filter: FilterChiTietNhapHang){
    const res = $fetch<RestPagedDataTable<ChiTietHangNhapModel[]>>(`${this.baseApiUrl}${URL}/datatable`, {
      method: "POST",
      body: JSON.stringify(filter),
    });
    if (res) {
      return res;
    }
    return null;
  }

  async insert(data: ChiTietHangNhapModel){
    const res = $fetch<RestData<number> | RestError>(`${this.baseApiUrl}${URL}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res) {
      return res;
    }
    return null;
  }
  async update(data: ChiTietHangNhapModel){
    const res = $fetch<RestData<number> | RestError>(`${this.baseApiUrl}${URL}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res) {
      return res;
    }
    return null;
  }
}
const ChiTietNhapHangService = new _ChiTietNhapHangService();
export { ChiTietNhapHangService };