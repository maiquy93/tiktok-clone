import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

function SideBar() {
  return (
    <aside className={cx("wrapper")}>
      <h2>For you</h2>
      <h2>Following</h2>
      <h2>Live</h2>
    </aside>
  );
}

export default SideBar;
