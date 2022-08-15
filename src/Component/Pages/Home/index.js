import styles from "./home.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("home")}>
      <h3>Home page</h3>
      {/* <div className={cx("home-bot-bar")}>
        <BottomSideBar>
          <div>
            <a href="">#Discovery</a>
            <div>
              <a href="">#Trending</a>
            </div>
          </div>
        </BottomSideBar>
      </div>
      <div className={cx("home-content")}>
        <h3>Home content</h3>
      </div> */}
    </div>
  );
}

export default Home;
