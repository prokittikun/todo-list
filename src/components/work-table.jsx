/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Table(props) {
    
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
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <>
        {/* {dataDropdown.map((value, index) => {
            return <option value={value.value}>{value.name}</option>;
          })} */}
      </>
    </div>
  );
}
