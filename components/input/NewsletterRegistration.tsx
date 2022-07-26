import { FormEvent } from "react";
import classes from "./NewsletterRegistration.module.css";

const NewsletterRegistration = () => {
  const registrationHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  };

  return (
    <section className={classes.newsletter}>
      <h2>Ingresa para mantenerte actualizado!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
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
