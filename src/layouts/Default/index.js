import Header from "../Header";
import MainSideBar from "../SideBar/MainSidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header className={cx("header")} />
      <div className={cx("container")}>
        <MainSideBar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;