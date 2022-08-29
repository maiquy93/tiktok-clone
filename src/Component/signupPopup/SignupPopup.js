import styles from "./signuppopup.module.scss";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function SignupPopup({ btnOnly }) {
  const [signupShow, setSignupShow] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsername] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [repasswordValue, setRepassword] = useState("");
  const [nameValue, setName] = useState("");
  const [nicknameValue, setNickname] = useState("");
  const [avatarValue, setAvatar] = useState("");
  const [backround, setBackground] = useState("");
  const [nocticeShow, setNoctice] = useState(false);
  const [userWarning, setUserWarning] = useState(false);
  const [confirmWarning, setConfirmWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);

  const formRef = useRef();

  //valid form
  const handdleCompare = () => {
    axios
      .get("http://localhost:8000/users/find", {
        params: {
          user: usernameValue,
        },
      })
      .then(res => {
        if (res.data === true) {
          setUserWarning(true);
        } else if (res.data === false) setUserWarning(false);
      });
  };
  //email valid
  function emailValid() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(emailValue)) setEmailWarning(true);
    else setEmailWarning(false);
  }
  function handleClose() {
    setSignupShow(false);
    setNoctice(false);
    setUserWarning(false);
    setConfirmWarning(false);
    setPasswordWarning(false);
  }
  //handle sumbmit
  function handleSubmit(event) {
    event.preventDefault();
    if (!userWarning && !confirmWarning && !emailWarning && !passwordWarning) {
      axios
        .post("http://localhost:8000/users/register", {
          email: emailValue,
          username: usernameValue,
          password: repasswordValue,
          name: nameValue,
          nickname: nicknameValue,
          avatar: avatarValue,
          userbackround: backround,
        })
        .then(res => {
          if (res.data === true) {
            setSignupShow(false);
            setNoctice(true);
          }
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <>
      <button
        className={cx("signup")}
        onClick={() => {
          setSignupShow(true);
        }}
      >
        Sign Up
      </button>
      {signupShow && (
        <div className={cx("form-wrapper")}>
          <h1 className={cx("title")}>Sign up</h1>
          <div className={cx("register-form")} method="POST" ref={formRef}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onBlur={emailValid}
              value={emailValue}
              placeholder="Enter your email"
              className={cx("input")}
              onChange={e => {
                setEmailWarning(false);
                setEmailValue(e.target.value);
              }}
              required
            ></input>
            {emailWarning && (
              <span className={cx("warning")}>Email incorrect</span>
            )}
            <br />

            <label htmlFor="username">Username</label>
            <input
              name="username"
              onBlur={handdleCompare}
              value={usernameValue}
              onChange={e => {
                setUserWarning(false);
                setUsername(e.target.value);
              }}
              placeholder="Username is your account"
              className={cx("input")}
              required
            ></input>
            {userWarning && (
              <span className={cx("warning")}>Username already exists</span>
            )}
            <br />

            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={passwordValue}
              onBlur={() => {
                if (passwordValue.length < 6) setPasswordWarning(true);
              }}
              onChange={e => {
                setPasswordWarning(false);
                setPassword(e.target.value);
              }}
              placeholder="Password minimum 6 characters"
              className={cx("input")}
              required
            ></input>
            {passwordWarning && (
              <span className={cx("warning")}>
                Password at least 6 characters
              </span>
            )}

            <label htmlFor="re-password">Confirm password</label>
            <input
              name="re-password"
              onBlur={() => {
                if (passwordValue !== repasswordValue) setConfirmWarning(true);
              }}
              value={repasswordValue}
              onChange={e => {
                setConfirmWarning(false);
                setRepassword(e.target.value);
              }}
              placeholder="Re-enter your password"
              className={cx("input")}
              required
            ></input>
            {!passwordWarning && confirmWarning && (
              <span className={cx("warning")}>Confirm password incorrect</span>
            )}

            <label htmlFor="name">Your name</label>
            <input
              name="name"
              value={nameValue}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              className={cx("input")}
              required
            ></input>

            <label htmlFor="nickname">Nick name</label>
            <input
              name="nickname"
              value={nicknameValue}
              onChange={e => setNickname(e.target.value)}
              placeholder="Enter your nick name"
              className={cx("input")}
            ></input>

            <label htmlFor="avatar">Avatar</label>
            <input
              name="avatar"
              value={avatarValue}
              onChange={e => setAvatar(e.target.value)}
              placeholder="Your URL picture"
              className={cx("input")}
            ></input>

            <label htmlFor="background">Back ground</label>
            <input
              name="background"
              value={backround}
              onChange={e => setBackground(e.target.value)}
              placeholder="Your URL picture"
              className={cx("input")}
            ></input>

            <div className={cx("nav")}>
              <button
                className={cx("btn", "register-btn")}
                onClick={event => handleSubmit(event)}
              >
                Register
              </button>
              <button className={cx("btn", "close-btn")} onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {nocticeShow && (
        <span className={cx("noctice")} onClick={() => setNoctice(false)}>
          <span className={cx("noctice-btn")}>
            Your account has been created
          </span>
          <span>Click here to close</span>
        </span>
      )}
    </>
  );
}

export default SignupPopup;
