import Button from "../ui/Button";
import classes from "./ResultsTitle.module.css";

type ResultsTitleProps = {
  date: Date;
};

const ResultsTitle = ({ date }: ResultsTitleProps) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Eventos en {humanReadableDate}</h1>
      <Button href="/events">Mostrar todos los eventos</Button>
    </section>
  );
};

export default ResultsTitle;
