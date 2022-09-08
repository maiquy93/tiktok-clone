import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./child.module.scss";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { cmtRefeshCreator } from "redux/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cmtRefeshSelector } from "redux/selector";

const cx = classNames.bind(styles);

function CommentChild({ comment }) {
  const [optionShow, setOptionShow] = useState(false);
  const [alertshow, setAlertShow] = useState(false);

  const dispatch = useDispatch();
  const cmtRefesh = useSelector(cmtRefeshSelector);
  console.log(cmtRefesh);
  const currentUser =
    JSON?.parse(localStorage?.getItem("userdata"))?._id || undefined;
  const handleDeleteShow = () => {
    setAlertShow(true);
  };

  const handleCmtDelete = async cmtID => {
    try {
      await axios.delete("http://localhost:8000/commentdelete", {
        params: {
          id: cmtID,
        },
      });
    } catch (error) {}

    setAlertShow(false);
    setOptionShow(false);
    dispatch(cmtRefeshCreator(!cmtRefesh));
  };

  return (
    <span key={comment._id} className={cx("comment-container")}>
      <a href={`/@${comment.author.username}`}>
        <img
          className={cx("cmt-user-avatar")}
          src={comment.author.avatar}
          alt={comment.author.name}
        />
      </a>
      <div className={cx("cmt-user-info")}>
        <div className={cx("info-wrap")}>
          <a href={`/@${comment.author.username}`} className={cx("cmt-user")}>
            <span>{comment.author.name}</span>
          </a>
          <div className={cx("option-container")}>
            <button
              className={cx("option-btn")}
              onClick={() => setOptionShow(prev => !prev)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            {optionShow && (
              <div className={cx("more-box")}>
                <button className={cx("more-btn")}>Report</button>
                {currentUser === comment?.author?.UID && (
                  <button className={cx("more-btn")} onClick={handleDeleteShow}>
                    Delete
                  </button>
                )}
                {alertshow && (
                  <div className={cx("delete-alert")}>
                    <p className={cx("alert-title")}>
                      Are you really want to delete it?
                    </p>
                    <div className={cx("btn-nav")}>
                      <button
                        className={cx("okbtn")}
                        onClick={() => handleCmtDelete(comment._id)}
                      >
                        OK
                      </button>
                      <button
                        className={cx("cancelbtn")}
                        onClick={() => setAlertShow(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <span className={cx("cmt-content")}>{comment.content}</span>
      </div>
    </span>
  );
}

export default CommentChild;
