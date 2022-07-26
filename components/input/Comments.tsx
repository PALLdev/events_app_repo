import { useState } from "react";
import { CommentType } from "../../util/types";
import CommentList from "./CommentList";
import classes from "./Comments.module.css";
import NewComment from "./NewComment";

type CommentsProps = {
  eventId: string;
};

const Comments = ({ eventId }: CommentsProps) => {
  const [showComments, setShowComments] = useState(false);

  const toggleCommentsHandler = () => {
    setShowComments((prevState) => !prevState);
  };

  const addCommentHandler = (commentData: CommentType) => {
    // send data to API
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Ocultar" : "Mostrar"} Comentarios
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
};

export default Comments;
