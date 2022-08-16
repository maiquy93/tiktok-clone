import Header from "../Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header className={cx("header")} />
      <div className={cx("container")}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
