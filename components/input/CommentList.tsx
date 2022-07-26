import classes from "./CommentList.module.css";

const CommentList = () => {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>Mi comentario es asombroso!</p>
        <div>
          Por <address>Maximiliano</address>
        </div>
      </li>
      <li>
        <p>Mi comentario es de otro mundo!</p>
        <div>
          Por <address>Maximiliano</address>
        </div>
      </li>
    </ul>
  );
};

export default CommentList;
