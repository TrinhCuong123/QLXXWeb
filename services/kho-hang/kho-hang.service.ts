import type { FilterKhoHang } from "~/models/Filter/filter-param.model";
import { BaseService } from "../base.service";
import type { RestData, RestError, RestPagedDataTable } from "~/models/base-response.model";
import type { KhoHangModel } from "~/models/kho-hang/kho-hang.model";

const URL = "/api/kho-hang";
class _KhoHangService extends BaseService{
  async get(){
    const res = await $fetch<RestData<KhoHangModel>>(`${this.baseApiUrl}${URL}`, {
      method: 'GET',
    });
    if (res != null) {
      return res.data;
    }
    return [];
  }
  async getDatatable(filters: FilterKhoHang){
    const res = $fetch<RestPagedDataTable<KhoHangModel[]>>(`${this.baseApiUrl}${URL}/datatable`, {
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

  async insert(data: KhoHangModel){
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

  async update(data: KhoHangModel){
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
const KhoHangService = new _KhoHangService();
export { KhoHangService };