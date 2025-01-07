import type { RestData, RestError } from '~/models/base-response.model';
import { BaseService } from '../base.service';
import type { NhanVienModel } from '~/models/nhan-vien/nhan-vien.model';

const URL = "/api/nhan-vien"
class _NhanVienService extends BaseService {
  async getNhanVien() {
    const res = await $fetch<RestData<NhanVienModel[]>>(`${this.baseApiUrl}${URL}`, {
      method: 'GET',
    });
    if (res != null) {
      return res;
    }
    return [];
  }
  async getByIdNhanVien(id: number) {
    const res = await $fetch<RestData<NhanVienModel>>(`${this.baseApiUrl}${URL}`, {
      method: 'GET',
      params: {id: id}
    });
    if (res != null) {
      return res;
    }
    return [];
  }

  async insertNhanVien(entity: NhanVienModel) {
    const res = await $fetch<RestData<number> | RestError>(`${this.baseApiUrl}${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    });
    if (res) {
      return res;
    }
    return null;
  }

  async updateNhanVien(entity: NhanVienModel) {
    const res = await $fetch<RestData<number> | RestError>(`${this.baseApiUrl}${URL}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    });
    if (res) {
      return res;
    }
    return null;
  }

  async deleteNhanVien(id: number) {
    const res = await $fetch<RestData<number> | RestError>(`${this.baseApiUrl}${URL}`, {
      method: `DELETE`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    if (res ) {
      return res;
    }
    return null;
  }
}

const NhanVienService = new _NhanVienService();
export { NhanVienService };
