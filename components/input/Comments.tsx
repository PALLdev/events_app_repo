import { useEffect, useState } from "react";
import { CommentsResType, CommentType } from "../../util/types";
import CommentList from "./CommentList";
import classes from "./Comments.module.css";
import NewComment from "./NewComment";

type CommentsProps = {
  eventId: string;
};

const Comments = ({ eventId }: CommentsProps) => {
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<Array<CommentsResType>>([]);

  // se ejecuta al cambiar el estado de showcomments, si es true (osea quiero mostrar los comentarios) hago el get request
  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCommentsList(data.comments);
        });
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevState) => !prevState);
  };

  const addCommentHandler = (commentData: CommentType) => {
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Ocultar" : "Mostrar"} Comentarios
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={commentsList} />}
    </section>
  );
};

export default Comments;
