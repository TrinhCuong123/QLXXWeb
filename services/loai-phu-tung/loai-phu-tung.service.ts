import type {
  RestData,
  RestError,
  RestPagedDataTable,
} from "~/models/base-response.model";
import { BaseService } from "../base.service";
import type { LoaiPhuTungModel } from "~/models/loai-phu-tung/loai-phu-tung.model";
import type { FilterLoaiPhuTung } from "~/models/Filter/filter-param.model";

const URL = "/api/loai-phu-tung";
class _LoaiPhuTungService extends BaseService {
  async getLoaiPhuTung() {
    const res = await $fetch<RestData<LoaiPhuTungModel[]>>(
      `${this.baseApiUrl}${URL}`,
      {
        method: "GET",
      }
    );
    if (res != null) {
      return res;
    }
    return [];
  }
  async getDatatable(data: FilterLoaiPhuTung) {
    const res = await $fetch<RestPagedDataTable<LoaiPhuTungModel[]>>(
      `${this.baseApiUrl}${URL}/datatable`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    if (res) {
      return res;
    }
    return null;
  }

  async getByIdLoaiPhuTung(id: number) {
    const res = await $fetch<RestData<LoaiPhuTungModel>>(
      `${this.baseApiUrl}${URL}/${id}`,
      {
        method: "GET",
      }
    );
    if (res != null) {
      return res;
    }
    return null;
  }

  async insertLoaiPhuTung(entity: LoaiPhuTungModel) {
    const res = await $fetch<RestData<number> | RestError>(
      `${this.baseApiUrl}${URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entity),
      }
    );
    if (res) {
      return res;
    }
    return null;
  }

  async updateLoaiPhuTung(entity: LoaiPhuTungModel) {
    const res = await $fetch<RestData<number> | RestError>(
      `${this.baseApiUrl}${URL}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entity),
      }
    );
    if (res) {
      return res;
    }
    return null;
  }

  async deleteLoaiPhuTung(id: number) {
    const res = await $fetch<RestData<number> | RestError>(
      `${this.baseApiUrl}${URL}/${id}`,
      {
        method: `DELETE`,
      }
    );
    if (res) {
      return res;
    }
    return null;
  }
}

const LoaiPhuTungService = new _LoaiPhuTungService();
export { LoaiPhuTungService };
