abstract class BaseService {
  public readonly baseApiUrl: string;

  constructor() {
    // this.baseApiUrl = 'http://localhost:5140';
    this.baseApiUrl = 'https://93f3-116-101-187-121.ngrok-free.app/';
  }
}
export { BaseService };
