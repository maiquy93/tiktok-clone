import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faHeart,
  faMusic,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./videoitem.module.scss";
import classNames from "classnames/bind";
import { useRef, useState } from "react";

import Comment from "Component/comments/Comment";

const cx = classNames.bind(styles);

function VideoItem({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cmtShow, setcmtShow] = useState(false);
  const [like, setLike] = useState(false);

  const [numberHeart, setNumberHeart] = useState(video.votes);

  const videoRef = useRef();
  // const videoWidth = videoRef.current.offsetWidth;

  //xu ly btn follow
  const currentUser = JSON.parse(localStorage.getItem("userdata"))?._id;
  const followBtnShow = currentUser === video.author?.userID;

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
          alt={video.author?.usernickname}
          className={cx("item-avatar")}
          src={video.author?.userAvatar}
        ></img>
      </a>
      <div className={cx("content-container")}>
        <div className={cx("info-wrapper")}>
          <div className={cx("user-info")}>
            <div className={cx("user-box")}>
              <a className={cx("user-name")} href={`/@${video.author.link}`}>
                {video.author?.userName}
              </a>
              <p className={cx("info-cap")}>{video.author?.usernickname}</p>
            </div>

            {!followBtnShow && (
              <button className={cx("follow-btn")}>Follow</button>
            )}
          </div>
          <p className={cx("video-title")}>{video.videoTitle}</p>
          <p className={cx("music-title")}>
            <FontAwesomeIcon
              icon={faMusic}
              style={{ fontSize: "small", marginRight: "5px" }}
            />
            <i>{video.music}</i>
          </p>
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
          {cmtShow && <Comment videoID={video._id} />}
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
