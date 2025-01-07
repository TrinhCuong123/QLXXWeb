import type { FilterNhapHang } from "~/models/Filter/filter-param.model";
import { BaseService } from "../base.service";
import type { RestData, RestError, RestPagedDataTable } from "~/models/base-response.model";
import { NhapHangModel } from "~/models/nhap-hang/nhap-hang.model";

const URL = "/api/nhap-hang";
class _NhapHangService extends BaseService{
  async getDatatable(filters: FilterNhapHang){
    const res = $fetch<RestPagedDataTable<NhapHangModel[]>>(`${this.baseApiUrl}${URL}/datatable`, {
      method: "POST",
      body: JSON.stringify(filters),
    });
    if (res) {
      return res;
    }
    return null;
  }
  async getByID(id: number){
    const res = $fetch<RestData<number> | RestError>(`${this.baseApiUrl}${URL}/${id}`, {
      method: "GET",
    });
    if (res) {
      return res;
    }
    return null;
  }

  async insert(data: NhapHangModel){
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

  async update(data: NhapHangModel){
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


  async delete(id: number) {
      const res = await $fetch<RestData<number> | RestError>(`${this.baseApiUrl}${URL}/${id}`, {
        method: `DELETE`,
      });
      if (res ) {
        return res;
      }
      return null;
    }
}
const NhapHangService = new _NhapHangService();
export { NhapHangService };