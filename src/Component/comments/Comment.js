import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./comment.module.scss";

const cx = classNames.bind(styles);

function Comment({ videoID }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/comments?vidid=${videoID}`)
      .then(res => setComments(res.data))
      .catch(err => console.log("Can not connect"));
  }, []);
  return comments.map(comment => {
    return (
      <div key={comment._id} className={cx("comment-container")}>
        <a href="/">
          <img
            className={cx("cmt-user-avatar")}
            src="https://muahoatuoi.vn/uploads/noidung/images/hoa-mau-don.jpg"
            alt={comment.author.name}
          />
        </a>
        <div className={cx("cmt-user-info")}>
          <a href="/" className={cx("cmt-user")}>
            <span>{comment.author.name}</span>
          </a>
          <span className={cx("cmt-content")}>{comment.content}</span>
        </div>
        <input type="text"></input>
      </div>
    );
  });
}

export default Comment;
