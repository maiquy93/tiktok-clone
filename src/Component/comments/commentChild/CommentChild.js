import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./child.module.scss";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function CommentChild({ comment }) {
  const [optionShow, setOptionShow] = useState(false);
  const currentUser =
    JSON?.parse(localStorage?.getItem("userdata"))._id || undefined;

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
                  <button className={cx("more-btn")}>Delete</button>
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
