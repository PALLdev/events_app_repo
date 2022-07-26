import { FormEvent, useRef, useState } from "react";
import { FeedbackType } from "../../util/types";
import Button from "../ui/Button";
import classes from "./Feedback.module.css";

type FeedbackProps = {
  feedbackList: Array<FeedbackType>;
};

const Feedback = ({ feedbackList }: FeedbackProps) => {
  // const [feedbackList, setFeedbackList] = useState<Array<FeedbackType>>([]);
  const [feedbackDetails, setFeedbackDetails] = useState<FeedbackType>();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredFeedback = feedbackInputRef.current?.value;

    const bodyObj = { email: enteredEmail, feedbackText: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const loadFeedbackHandler = (id: string) => {
    fetch(`api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedbackDetails(data.feedback));
  };

  // useEffect(() => {
  //   fetch("/api/feedback", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setFeedbackList(data.feedback));
  // }, [setFeedbackList]);

  return (
    <>
      <form className={classes.feedback} onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input ref={emailInputRef} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="feedback">Tu feedback</label>
          <textarea ref={feedbackInputRef} id="feedback" rows={5} />
        </div>
        <Button>Enviar feedback</Button>
      </form>
      {feedbackList.length === 0 ? (
        <div>No items</div>
      ) : (
        <div>
          {feedbackDetails && <p>{feedbackDetails.email}</p>}
          <ul>
            {feedbackList.map((feedback) => (
              <li key={feedback.id}>
                {feedback.text}{" "}
                <button onClick={loadFeedbackHandler.bind(null, feedback.id)}>
                  Mostrar detalles
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Feedback;
