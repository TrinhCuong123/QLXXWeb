import type {  RestData, RestError } from '~/models/base-response.model';
import { BaseService } from '../base.service';
import type { PhuTungModel } from '~/models/khach-hang/khach-hang.model';


const URL = "/api/phu-tung"
class _PhuTungService extends BaseService {
  async getPhuTung() {
    const res = await $fetch<RestData<PhuTungModel>>(`${this.baseApiUrl}${URL}`, {
      method: 'GET',
    });
    if (res != null) {
      return res;
    }
    return [];
  }
  async getByIdPhuTung(id: number) {
    const res = await $fetch<RestData<PhuTungModel>>(`${this.baseApiUrl}${URL}`, {
      method: 'GET',
      params: {id: id}
    });
    if (res != null) {
      return res;
    }
    return [];
  }

  async insertPhuTung(entity: PhuTungModel) {
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

  async updatePhuTung(entity: PhuTungModel) {
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

  async deletePhuTung(id: number) {
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

const PhuTungService = new _PhuTungService();
export { PhuTungService };
