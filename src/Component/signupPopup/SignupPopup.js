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
  const [nocticeShow, setNoctice] = useState("false");

  const formRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
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
            <label for="email">Email</label>
            <input
              name="email"
              value={emailValue}
              placeholder="Enter your email"
              className={cx("input")}
              onChange={e => setEmailValue(e.target.value)}
              required
            ></input>

            <label for="username">Username</label>
            <input
              name="username"
              value={usernameValue}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username is your account"
              className={cx("input")}
              required
            ></input>

            <label for="password">Password</label>
            <input
              name="password"
              value={passwordValue}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password minimum 6 characters"
              className={cx("input")}
              required
            ></input>

            <label for="re-password">Re-password</label>
            <input
              name="re-password"
              value={repasswordValue}
              onChange={e => setRepassword(e.target.value)}
              placeholder="Re-enter your password"
              className={cx("input")}
              required
            ></input>

            <label for="name">Your name</label>
            <input
              name="name"
              value={nameValue}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              className={cx("input")}
              required
            ></input>

            <label for="nickname">Nick name</label>
            <input
              name="nickname"
              value={nicknameValue}
              onChange={e => setNickname(e.target.value)}
              placeholder="Enter your nick name"
              className={cx("input")}
            ></input>

            <label for="avatar">Avatar</label>
            <input
              name="avatar"
              value={avatarValue}
              onChange={e => setAvatar(e.target.value)}
              placeholder="Your URL picture"
              className={cx("input")}
            ></input>

            <label for="background">Back ground</label>
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
              <button
                className={cx("btn", "close-btn")}
                onClick={() => setSignupShow(false)}
              >
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
