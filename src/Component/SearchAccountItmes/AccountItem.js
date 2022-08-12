import styles from "./AccountItems.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import images from "../../assets/images/image";
import { useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function AccountItem({ fullname, nickname, avatar, check, to }) {
  const [fallback, setFallback] = useState("");
  const handleAvatar = () => {
    setFallback(images.noImage);
  };
  return (
    <Link to={to} className={cx("wrapper")}>
      <img
        src={fallback || avatar}
        className={cx("avatar")}
        alt={nickname}
        onError={handleAvatar}
      />
      <div className={cx("info")}>
        <p className={cx("fullname")}>
          <span>{fullname}</span>
          {check && <FontAwesomeIcon icon={faCheck} className={cx("check")} />}
        </p>
        <p className={cx("username")}>{nickname}</p>
      </div>
    </Link>
  );
}
AccountItem.propTypes = {
  fullname: PropTypes.string,
  nickname: PropTypes.string,
  check: PropTypes.bool,
  to: PropTypes.string,
};

export default AccountItem;
