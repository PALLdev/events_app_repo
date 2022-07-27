import { FormEvent, useRef } from "react";
import classes from "./NewsletterRegistration.module.css";

const NewsletterRegistration = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const registrationHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // fetch user input (state or refs)
    const emailInput = emailInputRef.current?.value;

    // optional: validate input
    if (!emailInput || emailInput.trim() === "") {
      console.log("error");
    }

    // send valid data to API
    fetch("api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: emailInput }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={classes.newsletter}>
      <h2>Ingresa tu email para mantenerte actualizado!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Tu email"
            aria-label="Tu email"
          />
          <button>Registrar</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
