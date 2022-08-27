import styles from "./loginpopup.module.scss";
import classNames from "classnames/bind";
import { memo, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStateCreator, updateUserdataCreator } from "redux/action";

const cx = classNames.bind(styles);
function LoginPopup({ btnOnly, nonetips }) {
  const [formsShow, setFormShow] = useState(false);
  const [passwordWarning, setPassWarning] = useState(false);
  const [passwordValue, setPasswordVaule] = useState("");
  const [userValue, setUserValue] = useState("");
  const [incorrectpsw, setIncorrectpsw] = useState(false);
  const pswInputRef = useRef();

  const dispatch = useDispatch();

  //Press Enter to login
  useEffect(() => {
    window.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        loginRequire(event);
      }
    });
    return () => {
      window.removeEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          loginRequire(event);
        }
      });
    };
  });
  //valid password fontend
  const passwordNoctice = () => {
    if (passwordValue.length < 6) {
      setPassWarning(true);
    } else {
      setPassWarning(false);
    }
  };
  //handleClose
  const handleClose = () => {
    setFormShow(false);
    setPasswordVaule("");
    setUserValue("");
    setPassWarning(false);
    setIncorrectpsw(false);
  };
  //Xu ly dong popup khi click outside
  // useEffect(() => {
  //   const handleClickOutside = e => {
  //     if (!popupRef.current.contains(e.target)) {
  //       setFormShow(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  //handle login

  async function loginRequire(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login-require", {
        username: userValue,
        psw: passwordValue,
      })
      .then(res => {
        console.log(res.data);
        if (res.data.isLogin === true) {
          localStorage.setItem("isLogin", JSON.stringify(true));
          dispatch(loginStateCreator(res.data.isLogin));
          dispatch(updateUserdataCreator(res.data._doc));
          localStorage.setItem("userdata", JSON.stringify(res.data._doc));
          handleClose();
          window.location.reload();
        } else {
          setIncorrectpsw(true);
        }
      })
      .catch(err => console.log("connect failed:", err));
  }
  //test server
  // useEffect(() => {
  //   const response = axios.post("http://localhost:8000/login-require", {
  //     username: "sfsa",
  //     psw: "asfasf",
  //   });
  //   response.then(data => console.log(data.data));
  // }, []);

  return (
    <>
      <p className={cx("tips", { nonetips })}>
        Log in to follow creators, like videos, and view comments.
      </p>
      <button
        className={cx("login-btn", { btnOnly })}
        onClick={() => setFormShow(true)}
      >
        Login
      </button>
      {formsShow && (
        <div className={cx("form-popup")}>
          <form method="POST" className={cx("form-container")}>
            <h1 className={cx("login-title")}>Login</h1>
            <label htmlFor="username">
              <b>User name</b>
            </label>
            <input
              className={cx("inputbox", { incorrectpsw })}
              type="text"
              placeholder="Enter username"
              name="username"
              value={userValue}
              onChange={e => setUserValue(e.target.value)}
              required
            />
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className={cx("inputbox", { incorrectpsw, passwordWarning })}
              type="password"
              placeholder="Enter Password"
              name="psw"
              ref={pswInputRef}
              value={passwordValue}
              onChange={e => setPasswordVaule(e.target.value)}
              onBlur={passwordNoctice}
              required
            ></input>
            {passwordWarning && (
              <span
                className={cx("warning-password", "warning", {
                  passwordWarning,
                })}
              >
                Password minimum 6 characters
              </span>
            )}
            {!passwordWarning && incorrectpsw && (
              <span className={cx("warning")}>
                Incorrect username or password
              </span>
            )}
            <div>
              <button
                type="submit"
                className={cx("btn")}
                onClick={e => loginRequire(e)}
              >
                Login
              </button>
              <button className={cx("btn", "cancel")} onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default memo(LoginPopup);
