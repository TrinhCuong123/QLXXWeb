import type { FilterLichSuHangHoa } from "~/models/Filter/filter-param.model";
import { BaseService } from "../base.service";
import type { ChiTietHangNhapModel } from "~/models/chi-tiet-hang-nhap/chi-tiet-hang-nhap.model";
import type { RestData, RestError, RestPagedDataTable } from "~/models/base-response.model";

const URL = "/api/lichsu-hanghoa";
class _LichSuHangHoaService extends BaseService{
  async getDatatable(filter: FilterLichSuHangHoa){
    const res = $fetch<RestPagedDataTable<ChiTietHangNhapModel[]>>(`${this.baseApiUrl}${URL}/datatable`, {
      method: "POST",
      body: JSON.stringify(filter),
    });
    if (res) {
      return res;
    }
    return null;
  }
  async get(){
    const res = await $fetch<RestData<ChiTietHangNhapModel>>(`${this.baseApiUrl}${URL}`, {
      method: 'GET',
    });
    if (res != null) {
      return res.data;
    }
    return [];
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
}
const LichSuHangHoaService = new _LichSuHangHoaService();
export { LichSuHangHoaService };