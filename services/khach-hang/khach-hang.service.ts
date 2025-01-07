import type {
  RestData,
  RestError,
  RestPagedDataTable,
} from "~/models/base-response.model";
import { BaseService } from "../base.service";
import type { KhachHangModel, LichSuThayTheModel } from "~/models/khach-hang/khach-hang.model";
import type { FilterKhachHang, FilterLichSuSuaXe } from "~/models/Filter/filter-param.model";

const URLKHACHHANG = "/api/khach-hang";
const URLLICHSUSUA = "/api/lichsu-thaythe";

class _KhachHangService extends BaseService {
  async getChiTietKhachHang() {
    const res = await $fetch<RestData<KhachHangModel[]>>(
      `${this.baseApiUrl}${URLKHACHHANG}`,
      {
        method: "GET",
      }
    );
    if (res != null) {
      return res;
    }
    return [];
  }
  async getListKhachHang() {
    const res = await $fetch<RestData<KhachHangModel[]>>(
      `${this.baseApiUrl}${URLKHACHHANG}/list`,
      {
        method: "GET",
      }
    );
    if (res != null) {
      return res;
    }
    return [];
  }
  async getByIdKhachHang(id: number) {
    const res = await $fetch<RestData<KhachHangModel[]>>(
      `${this.baseApiUrl}${URLKHACHHANG}/${id}`,
      {
        method: "GET",
      }
    );
    if (res != null) {
      return res;
    }
    return [];
  }

  async insertKhachHang(entity: KhachHangModel) {
    const res = await $fetch<RestData<number> | RestError>(
      `${this.baseApiUrl}${URLKHACHHANG}`,
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

  async updateKhachHang(entity: KhachHangModel) {
    const res = await $fetch<RestData<number> | RestError>(
      `${this.baseApiUrl}${URLKHACHHANG}`,
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

  async deleteKhachHang(id: number) {
    const res = await $fetch<RestData<number> | RestError>(
      `${this.baseApiUrl}${URLKHACHHANG}/${id}`,
      {
        method: `DELETE`,
      }
    );
    if (res) {
      return res;
    }
    return null;
  }
  async getKhachHangDatatable(data: FilterKhachHang) {
    const res = await $fetch<RestPagedDataTable<KhachHangModel[]>>(
      `${this.baseApiUrl}${URLKHACHHANG}/datatable`,
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




  // Lịch sử sửa xe
  async getLichSuSuaXe(id: number) {
    const res = await $fetch<RestData<KhachHangModel[]>>(
      `${this.baseApiUrl}${URLLICHSUSUA}/list-customers`,
      {
        method: "GET",
        params: { id: id },
      }
    );
    if (res != null) {
      return res;
    }
    return [];
  }

  async getLichSuByID(id: number) {
    const res = await $fetch<RestData<KhachHangModel[]>>(
      `${this.baseApiUrl}${URLLICHSUSUA}/${id}`,
      {
        method: "GET",
      }
    );
    if (res != null) {
      return res;
    }
    return [];
  }

  async insertLichSuSuaXe( entity: LichSuThayTheModel) {
    const res = await $fetch<RestData<number> | RestError>(
      `${this.baseApiUrl}${URLLICHSUSUA}`,
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

  async updateLichSuSuaXe(entity: LichSuThayTheModel) {
    const res = await $fetch<RestData<number> | RestError>(
      `${this.baseApiUrl}${URLLICHSUSUA}`,
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

  async deleteLichSuSuaXe(id: number) {
    const res = await $fetch<RestData<number> | RestError>(
      `${this.baseApiUrl}${URLLICHSUSUA}/${id}`,
      {
        method: `DELETE`,
      }
    );
    if (res) {
      return res;
    }
    return null;
  }
  async getLichSuSuaXeDatatable(id: number,data: FilterLichSuSuaXe) {
    const res = await $fetch<RestPagedDataTable<LichSuThayTheModel[]>>(
      `${this.baseApiUrl}${URLLICHSUSUA}/datatable`,
      {
        method: "POST",
        params: {
          id: id,
        },
        body: JSON.stringify(data),
      }
    );
    if (res) {
      return res;
    }
    return null;
  }
}

const KhachHangService = new _KhachHangService();
export { KhachHangService };
