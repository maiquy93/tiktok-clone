import styles from "./home.module.scss";
import classNames from "classnames/bind";
import MainSideBar from "layouts/SideBar/MainSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();

  const handlePlay = () => {
    videoRef.current.play();
  };
  const handlePause = () => {
    videoRef.current.pause();
  };
  return (
    <div className={cx("home-page")}>
      <div className={cx("home-bar")}>
        <MainSideBar />
      </div>
      <div className={cx("home-content")}>
        <div className={cx("item-container")}>
          <a href="/">
            <img
              alt="sadas"
              className={cx("item-avatar")}
              src="https://media-cdn-v2.laodong.vn/storage/newsportal/2020/12/21/864060/Ngoc-Trinh-1.jpg"
            ></img>
          </a>
          <div className={cx("content-container")}>
            <div className={cx("info-wrapper")}>
              <div className={cx("user-info")}>
                <div className={cx("user-box")}>
                  <a className={cx("user-name")} href="/">
                    Ngon99br
                  </a>
                  <p className={cx("info-cap")}>Giai tri moi ngay</p>
                </div>
                <button className={cx("follow-btn")}>Follow</button>
              </div>
              <p className={cx("music-title")}>Music</p>
            </div>
            <div className={cx("video-container")}>
              <div className={cx("nav")}></div>
              <div className={cx("video-wrapper")}>
                <video
                  controls
                  className={cx("video-item")}
                  ref={videoRef}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  src="https://v16-webapp.tiktok.com/1444e73b854917eb7acea6c926d57c9a/63076b17/video/tos/useast2a/tos-useast2a-pve-0037-aiso/6393eb65deb040caa2776ba93069d29f/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2092&bt=1046&cs=0&ds=3&ft=z_piDPWT2NvjVPb1IozfuCYQFAe4nRQjlOp~2tOB&mime_type=video_mp4&qs=0&rc=Z2g0Nmg7NTs8ZGU5Nzg8PEBpM2g8cWQ6ZnM6ZTMzZjgzM0AvNWEwX2A2XjQxLTIxLi00YSNeMmFvcjRfcW1gLS1kL2Nzcw%3D%3D&l=20220825062904010245100117250DDB51&btag=80000"
                ></video>
                {!isPlaying ? (
                  <button className={cx("play-btn")} onClick={handlePlay}>
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                ) : (
                  <button className={cx("play-btn")} onClick={handlePause}>
                    <FontAwesomeIcon icon={faPause} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
