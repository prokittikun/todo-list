import { css, cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CallApi from "../../services/callApi";
import Cookies from "universal-cookie";
const api = new CallApi();
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const navigate = useNavigate();
  useEffect(() => {
    const cookies = new Cookies();
    const loginDataString = cookies.get("login");
    if (loginDataString) {
      if (loginDataString.status === "true") {
        navigate("/home");
      }
    }
  }, [navigate]);

  function callLogin() {
    const formData = {
      username: username,
      password: password,
    };
    api.api(true, "login", formData).then((response) => {
      if (response.resCode === "0000") {
        const dataX = Object.assign(response.resData, { status: "true" });
        const data = JSON.stringify(dataX);
        cookies.set("login", data, { path: "/" });
        navigate("/home");
      } else {
        console.log(response.msg);
      }
    });
  }
  
  useEffect(() => {
    console.log("username->", username, "password->", password);
  }, [username, password]);
  return (
    <div className="login container mt-5">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div className="card bg-dark">
            <div className="card-header bg-dark text-center text-white">
              <h3>เข้าสู่ระบบ</h3>
            </div>
            <div className="card-body text-white">
              <div className="form-group">
                <label htmlFor="username" className="">
                  <h4>ชื่อผู้ใช้</h4>
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="กรุณากรอกชื่อผู้ใช้"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    // console.log(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="">
                  <h4>รหัสผ่าน</h4>
                </label>
                <input
                  type="text"
                  id="password"
                  className="form-control"
                  placeholder="กรุณากรอกรหัสผ่าน"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-success btn-lg col-12"
                  onClick={() => {
                    if (username && password !== "") {
                      console.log("login process..");
                      callLogin();
                    }
                  }}
                >
                  เข้าสู่ระบบ
                </button>
              </div>
              <div className="text-center">
                <NavLink className="text-white" to="/register">
                  ยังไม่เป็นสมาชิก ?
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

export default Login;
