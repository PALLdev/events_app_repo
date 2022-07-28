import { FormEvent, useRef, useState } from "react";
import { CommentBodyType } from "../../util/types";
import classes from "./NewComment.module.css";

type NewCommentProps = {
  onAddComment: (comment: CommentBodyType) => void;
};

const NewComment = ({ onAddComment }: NewCommentProps) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const sendCommentHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredName = nameInputRef.current?.value;
    const enteredComment = commentInputRef.current?.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });
  };

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Tu email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Tu nombre</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Tu comentario</label>
        <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && (
        <p>Porfavor ingrese una dirección email valida y el comentario!</p>
      )}
      <button>Enviar</button>
    </form>
  );
};

export default NewComment;
