import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faHeart,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./videoitem.module.scss";
import classNames from "classnames/bind";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

function VideoItem({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cmtShow, setcmtShow] = useState(false);
  const [like, setLike] = useState(false);

  const [numberHeart, setNumberHeart] = useState(video.votes);

  const videoRef = useRef();
  // const videoWidth = videoRef.current.offsetWidth;

  const handlePlay = () => {
    videoRef.current.play();
  };
  const handlePause = () => {
    videoRef.current.pause();
  };

  //handlelike
  function handlelike(_idvideo) {
    setLike(!like);
    if ((numberHeart === video.votes) & (like === false)) {
      setNumberHeart(prev => prev + 1);
    } else if (like === true) {
      setNumberHeart(video.votes);
    }
  }

  return (
    <div className={cx("item-container")}>
      <a href={video.link}>
        <img
          alt={video.author.usernickname}
          className={cx("item-avatar")}
          src={video.author.userAvatar}
        ></img>
      </a>
      <div className={cx("content-container")}>
        <div className={cx("info-wrapper")}>
          <div className={cx("user-info")}>
            <div className={cx("user-box")}>
              <a className={cx("user-name")} href="/">
                {video.author.userName}
              </a>
              <p className={cx("info-cap")}>{video.author.usernickname}</p>
            </div>
            <button className={cx("follow-btn")}>Follow</button>
          </div>
          <p className={cx("music-title")}>{video.music}</p>
        </div>
        <div className={cx("video-container")}>
          <div className={cx("video-wrapper")}>
            <video
              className={cx("video-item")}
              ref={videoRef}
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              src={video.videoUrl}
            ></video>
            {!isPlaying ? (
              <button
                className={cx("play-btn", { isPlaying })}
                onClick={handlePlay}
              >
                <FontAwesomeIcon icon={faPlay} />
              </button>
            ) : (
              <button
                className={cx("play-btn", { isPlaying })}
                onClick={handlePause}
              >
                <FontAwesomeIcon icon={faPause} />
              </button>
            )}
          </div>
          <div className={cx("analysis")}>
            <p className={cx("heart-icon")}>
              <FontAwesomeIcon icon={faHeart} />
              <span style={{ marginLeft: "10px" }}>{numberHeart}</span>
            </p>
            <p className={cx("comment-icon")}>
              <FontAwesomeIcon icon={faCommentDots} />
              <span style={{ marginLeft: "10px" }}>1</span>
            </p>
          </div>
          <div className={cx("nav")}>
            <button
              className={cx("nav-btn", { like })}
              onClick={() => handlelike(video._idvideo)}
            >
              Like
            </button>
            <button
              className={cx("nav-btn", { cmtShow })}
              onClick={() => setcmtShow(!cmtShow)}
            >
              Comments
            </button>
            <button className={cx("nav-btn")}>Share</button>
          </div>
          {cmtShow && (
            <div className={cx("comment-container")}>
              <a href="/">
                <img
                  className={cx("cmt-user-avatar")}
                  src="https://sohanews.sohacdn.com/2017/photo-1-1496635745742.jpg"
                  alt="dasdas"
                />
              </a>
              <div className={cx("cmt-user-info")}>
                <a href="/" className={cx("cmt-user")}>
                  <span>Đổng Khiết</span>
                </a>
                <span className={cx("cmt-content")}>
                  Sinh năm 1980 tại Liêu Ninh, Trung Quốc, Đổng Khiết xuất thân
                  từ vai trò là diễn viên múa. Sau khi tốt nghiệp trường múa,
                  Đổng Khiết được cử về Đoàn Ca múa nhạc Quân khu Quảng Châu.
                  Khác với nhiều diễn viên trẻ, con đường đến với nghệ thuật của
                  Đổng Khiết khá êm đềm.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
