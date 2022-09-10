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
import { useRef, useState, useEffect } from "react";
import Comment from "Component/comments/Comment";
import { useSelector } from "react-redux";
import { loginStateSelector } from "redux/selector";
import axios from "axios";
import { cmtRefeshSelector } from "redux/selector";
import { useDispatch } from "react-redux";
import { cmtRefeshCreator } from "redux/action";

const cx = classNames.bind(styles);

function VideoItem({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cmtShow, setcmtShow] = useState(false);
  const [like, setLike] = useState(false);
  const [numberHeart, setNumberHeart] = useState(video.votes.length);
  const [commentValue, setCommentValue] = useState("");
  const [commentData, setCommentData] = useState([]);

  const loginState = useSelector(loginStateSelector);

  const videoRef = useRef();

  const cmtRefesh = useSelector(cmtRefeshSelector);
  const dispatch = useDispatch();

  //get comment
  useEffect(() => {
    axios
      .get(`http://localhost:8000/comments?vidid=${video._id}`)
      .then(res => setCommentData(res.data))
      .catch(err => console.log("Can not connect"));
  }, [cmtRefesh, video._id]);

  //xu ly btn follow
  const currentUser = JSON.parse(localStorage.getItem("userdata"))?._id;
  const followBtnShow = currentUser === video.author?.userID;

  const handlePlay = () => {
    videoRef.current.play();
  };
  const handlePause = () => {
    videoRef.current.pause();
  };
  useEffect(() => {
    if (video.votes.includes(currentUser)) setLike(true);
  }, [currentUser, video.votes]);
  //handlelike
  console.log(video._id);
  console.log(currentUser);
  async function handlelike(_idvideo) {
    // setLike(!like);
    if (like === false && numberHeart === video.votes.length) {
      setLike(true);
      console.log("run");
      await axios.put(
        `http://localhost:8000/videovote?videoID=${video._id}&uservote=${currentUser}`
      );
      setNumberHeart(prev => prev + 1);
    } else if (like === true) {
      setLike(false);
      setNumberHeart(video.votes.length);
    }
  }
  //
  const handleComment = async e => {
    if (e.keyCode === 13 && commentValue.trim() !== "") {
      await axios.post("http://localhost:8000/commentpost", {
        vidID: video._id,
        content: commentValue,
        author: {
          UID: JSON.parse(localStorage?.getItem("userdata"))?._id,
          name: JSON.parse(localStorage?.getItem("userdata"))?.name,
          username: JSON.parse(localStorage?.getItem("userdata"))?.username,
          avatar: JSON.parse(localStorage?.getItem("userdata"))?.avatar,
        },
      });
      dispatch(cmtRefeshCreator(!cmtRefesh));
      setCommentValue("");
    }
  };

  return (
    <div className={cx("item-container")}>
      <a href={`@${video.author.link}`}>
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
              <span style={{ marginLeft: "10px" }}>{commentData.length}</span>
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
            <div className={cx("comments-container")}>
              {loginState?.value && (
                <div className={cx("comment-box")}>
                  <div className={cx("avt-input")}>
                    <img
                      className={cx("cmt-avatar")}
                      src={
                        JSON.parse(localStorage.getItem("userdata"))?.avatar ||
                        ""
                      }
                      alt={
                        JSON.parse(localStorage.getItem("userdata"))
                          ?.username || ""
                      }
                    />
                    <textarea
                      className={cx("comments-input")}
                      rows="2"
                      placeholder="Write your comment..."
                      value={commentValue}
                      onChange={e => setCommentValue(e.target.value)}
                      onKeyDown={e => handleComment(e)}
                    ></textarea>
                  </div>
                </div>
              )}
              <Comment videoID={video._id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
