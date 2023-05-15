// import logo from "./logo.svg";
import "./App.css";
import { css, cx } from "@emotion/css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "../dropdown";
import Table from "../work-table";
import Cookies from "universal-cookie";
import CallApi from "../../services/callApi";

function addDays(dateTime, count_days = 0) {
  return new Date(new Date(dateTime).setDate(dateTime.getDate() + count_days));
}

function App() {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(currentDate, 1));
  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [programingLanguage, setProgramingLanguage] = useState("html-css");
  const [newData, setNewData] = useState(false);
  const navigate = useNavigate();
  const api = new CallApi();

  useEffect(() => {
    const cookies = new Cookies();
    const loginData = cookies.get("login");
    console.log(loginData);
    if (loginData) {
      if (loginData.status !== "true") {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    setEndDate(addDays(startDate, 1));
  }, [startDate]);

  async function addData() {
    const language = programingLanguage;
    const name = projectName;
    const detail = projectDetail;
    const sDate = startDate.toJSON();
    const eDate = endDate.toJSON();
    const formData = {
      projectName: name,
      projectDetail: detail,
      projectLanguage: language,
      projectStatus: "todo",
      startDate: sDate,
      endDate: eDate,
    };

    api.api(true, "addData", formData).then((response) => {
      if (response.resCode === "0000") {
        setNewData(response);
        console.log(response);
      }
    });
  }
  return (
    <div className="App">
      <div className="container">
        <div
          className={
            "card mt-3 mb-3 shadow-lg bg-dark " +
            css`
              min-height: 96vh;
            `
          }
        >
          <div className="card-header bg-dark text-white text-center">
            <h3>Todo List</h3>
          </div>
          <div className="card-body text-white">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="header">
                    <h5>ชื่อโปรเจกต์</h5>
                  </label>
                  <input
                    placeholder="type your project name"
                    type="text"
                    id="header"
                    className="form-control"
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="header">
                    <h5>รายละเอียดงาน</h5>
                  </label>
                  <input
                    placeholder="type your project detail"
                    type="text"
                    id="header"
                    className="form-control"
                    onChange={(e) => setProjectDetail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="header">
                    <h5>ภาษา/framework ที่เลือกใช้</h5>
                  </label>
                  <Dropdown
                    onSelect={(x) => setProgramingLanguage(x)}
                  ></Dropdown>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="header">
                    <h5>กำหนดวันเริ่มทำงาน</h5>
                  </label>
                  <DatePicker
                    // disabledKeyboardNavigation
                    // showYearDropdown
                    className="form-control"
                    selected={startDate}
                    minDate={currentDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="header">
                    <h5>กำหนดวันเสร็จสิ้น</h5>
                  </label>
                  <DatePicker
                    // disabledKeyboardNavigation
                    // showYearDropdown
                    className="form-control"
                    selected={endDate}
                    minDate={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                className="form-control btn btn-outline-success btn-lg"
                onClick={() => addData()}
              >
                เพิ่ม
              </button>
            </div>
            <hr
              className={
                "border-light " +
                css`
                  opacity: 20%;
                `
              }
            />
            <div className="text-center">
              <h4>ตารางงาน</h4>
              <Table data={newData}></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
