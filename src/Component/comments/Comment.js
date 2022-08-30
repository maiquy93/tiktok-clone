import axios from "axios";

import { useEffect, useState } from "react";

import CommentChild from "./commentChild/CommentChild";

function Comment({ videoID }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/comments?vidid=${videoID}`)
      .then(res => setComments(res.data))
      .catch(err => console.log("Can not connect"));
  }, [videoID]);
  return comments.map((comment, index) => {
    return (
      <CommentChild comment={comment} key={comment.author?.UID || index} />
    );
  });
}

export default Comment;
