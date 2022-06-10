import axios from "axios";
import { environment } from "../env/env";

export default class CallApi {
  /**
   *@param haveBody มีการส่งBody True Or False
   *@param path path api ที่ใช้
   *@param body body ที่ต้องส่ง
   * @returns
   *
   **/
  async api(haveBody = Boolean, path, body = {}) {
    if (haveBody && body && path) {
      const x = await axios.post(`${environment.url}/${path}`, body);
      return x.data
    //   const data = await x.json();
    //   return data;
    }
    if (!haveBody && path) {
      const x = await axios.get(`${environment.url}/${path}`);
      return x.data
    }
  }
}
