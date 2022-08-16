import styles from "./home.module.scss";
import classNames from "classnames/bind";
import MainSideBar from "layouts/SideBar/MainSidebar";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("home-page")}>
      <div className={cx("home-bar")}>
        <MainSideBar />
      </div>
      <div className={cx("home-content")}>
        Home page Các Bạn Nam Lưu Ý Lại Để Chăm Sóc Người Phụ Nữ Mình Yêu Thương
        Nhé #anhtraimucoi #learnontiktok #ancungtiktok #svm #svmtv nhạc nền -
        Anh Trai Mũ Cối
      </div>
    </div>
  );
}

export default Home;
