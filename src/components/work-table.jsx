/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import CallApi from "../services/callApi";
import ReactPaginate from "react-paginate";
import { css, cx } from "@emotion/css";

export default function Table(props) {
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState({});
  const [reqPaging, setReqPaging] = useState({
    perPages: 6,
    currentPage: 1,
  });
  const [deleteStatus, setDeleteStatus] = useState(0)
  const handlePageClick = (event) => {
    event.selected = event.selected + 1;
    setReqPaging({
      perPages: 6,
      currentPage: event.selected,
    });
    console.log(event.selected);
  };
  const deleteOnClick = (event) => {
    const api = new CallApi();
    const data = {
      projectId: event,
    };
    api.api(true, "deleteWorkById", data).then((response) => {
      if (response) {
        setDeleteStatus(deleteStatus+1)
        console.log(response.resData);
      }
    });
  };
  useEffect(() => {
    const api = new CallApi();

    api.api(true, "getPaginationWorkList", reqPaging).then((response) => {
      if (response.datas) {
        setData(response.datas);
        setPaging(response);
        console.log(response.datas);
      }
    });
    // console.log("event emit success ->", props.data);
  }, [props.data, reqPaging, deleteStatus]);
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
                      <td>{index + 1 + (paging.currentPage - 1) * 10}</td>
                      <td>{x.project_name}</td>
                      <td>{x.project_detail}</td>
                      <td>{start[0]}</td>
                      <td>{end[0]}</td>
                      <td>todo</td>
                      <td>
                        <button
                          className={"btn btn-outline-danger btn-sm"}
                          onClick={() => {
                            deleteOnClick(x.project_id);
                          }}
                        >
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
              <div className="text-center">ไม่มีงานที่ต้องทำ</div>
          )
          // }
        }
      </div>
      <div
        className={
          "" +
          css`
            /* margin-left: 44vh; */
          `
        }
      >
        {paging.totalPages > 0 && (
          <div
            className={
              "text-center" +
              css`
                /* margin-left: auto; */
                /* margin-right: auto; */
              `
            }
          >
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={paging.totalPages}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
