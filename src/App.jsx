import logo from "./logo.svg";
import "./App.css";
import { css, cx } from "@emotion/css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getCurrentDate } from "./services/get-current-date";
import Dropdown from "./components/dropdown";
import Table from "./components/work-table";

function addDays(dateTime, count_days = 0) {
  return new Date(new Date(dateTime).setDate(dateTime.getDate() + count_days));
}

function App() {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(new Date());
  const [endDateStart, setEndDateStart] = useState(addDays(currentDate, 1));
  useEffect(() => {
    setEndDateStart(addDays(startDate, 1));
  }, [startDate]);
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
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="header">
                    <h5>ภาษา/framework ที่เลือกใช้</h5>
                  </label>
                  <Dropdown onSelect={(x)=> console.log(x)}></Dropdown>
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
                    selected={endDateStart}
                    minDate={endDateStart}
                    onChange={(date) => setEndDateStart(date)}
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="form-control btn btn-outline-success btn-lg">
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
              <Table></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
