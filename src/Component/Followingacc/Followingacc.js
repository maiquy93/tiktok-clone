import styles from "./followingacc.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Followingacc() {
  return (
    <>
      <p className={cx("title")}>Follwing accounts</p>
      <span className={cx("tips")}>Accounts you follow will appear here</span>
    </>
  );
}

export default Followingacc;
