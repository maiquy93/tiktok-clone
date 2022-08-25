import { useRef, useState, useEffect } from "react";

function LoginForm() {
  const [formsShow, setFormShow] = useState(false);
  const [passwordWarning, setPassWarning] = useState(false);
  const [passwordValue, setPasswordVaule] = useState("");
  const popupRef = useRef();

  //valid password fontend
  const passwordNoctice = () => {
    if (passwordValue.length < 6) {
      setPassWarning(true);
    } else {
      setPassWarning(false);
    }
  };
  //Xu ly dong popup khi click outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (!popupRef.current.contains(e.target)) {
        setFormShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={cx("form-popup")} ref={popupRef}>
      <form action="/login_require" className={cx("form-container")}>
        <h1 className={cx("login-title")}>Login</h1>
        <label htmlFor="username">
          <b>User name</b>
        </label>
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          required
        />
        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          value={passwordValue}
          onChange={e => setPasswordVaule(e.target.value)}
          onBlur={passwordNoctice}
          required
        ></input>
        {passwordWarning && (
          <span className={cx("warning-password")}>
            Password minimum 6 characters
          </span>
        )}
        <div>
          <button type="submit" className={cx("btn")}>
            Login
          </button>
          <button
            type="submit"
            className={cx("btn", "cancel")}
            onClick={() => setFormShow(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
