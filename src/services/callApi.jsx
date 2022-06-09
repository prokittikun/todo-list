import axios from "axios";
import { environment } from "../env/env";
import { useEffect, useState } from "react";

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
    // if (!haveBody && path) {
    //   console.log("get");
    //   let data;
    //   axios.get(`${environment.url}/${path}`).then((res) => {
    //     data = res.data;
    //     // this.setState({ persons });
    //   });
    //   return data;
    // }
  }
}
