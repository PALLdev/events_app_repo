import { CommentsResType } from "../../util/types";
import classes from "./CommentList.module.css";

type CommentListProps = {
  items: Array<CommentsResType>;
};

const CommentList = ({ items }: CommentListProps) => {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((comment) => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            Por <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
