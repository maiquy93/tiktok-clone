import axios from "axios";

import { useEffect, useState } from "react";

import CommentChild from "./commentChild/CommentChild";

function Comment({ refresh, videoID }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/comments?vidid=${videoID}`)
      .then(res => setComments(res.data))
      .catch(err => console.log("Can not connect"));
  }, [refresh, videoID]);

  //get comment to video
  useEffect(() => {
    axios
      .get(`http://localhost:8000/comments?vidid=${videoID}`)
      .then(res => setComments(res.data))
      .catch(err => console.log("Can not connect"));
  }, [videoID]);

  // const newcomments = [...comments].reverse();

  return (
    <>
      {[...comments].reverse().map((comment, index) => (
        <CommentChild
          comment={comment}
          key={`${comment.author?.UID}${index}`}
        ></CommentChild>
      ))}
    </>
  );
}

export default Comment;
