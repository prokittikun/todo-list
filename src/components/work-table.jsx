/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import CallApi from "../services/callApi";

export default function Table(props) {
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState();
  useEffect(() => {
    const paging = {
      perPages: 10,
      currentPage: 1,
    };
    const api = new CallApi();

    
    api.api(true, "getPaginationWorkList", paging).then((response) => {
      if (response.datas) {
        setData(response.datas);
        setPaging(response);
        console.log(response.datas);
      }
    });
    // console.log("event emit success ->", props.data);
  }, [props.data]);
  return (
    <div>
      <div className="table-responsive">
        <table className="table text-white">
          <thead>
            <tr>
              <th>#</th>
              <th>ชื่อโปรเจกต์</th>
              <th>รายละเอียดงาน</th>
              <th>วันเริ่มทำงาน</th>
              <th>วันส่งงาน</th>
              <th>สถานะ</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 &&
                // if(data){
                data.map((x, index) => {
                  const start = x.project_start.split("T");
                  const end = x.project_end.split("T");
                  return (
                    <tr key={index}>
                      <td>{(index+1)+((paging.currentPage-1)*10)}</td>
                      <td>{x.project_name}</td>
                      <td>{x.project_detail}</td>
                      <td>{start[0]}</td>
                      <td>{end[0]}</td>
                      <td>todo</td>
                      <td>
                        <button className={"btn btn-outline-danger btn-sm"}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              // }
            }
          </tbody>
        </table>
        {
          data.length === 0 && (
            // if(data){
            <>
              <div className="text-center">ไม่มีงานที่ต้องทำ</div>
            </>
          )
          // }
        }
      </div>
      <>
        {/* {dataDropdown.map((value, index) => {
            return <option value={value.value}>{value.name}</option>;
          })} */}
      </>
    </div>
  );
}
