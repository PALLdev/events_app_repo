import { FormEvent, useRef } from "react";
import Button from "../ui/Button";
import classes from "./EventSearch.module.css";

type EventSearchProps = {
  onSearch: (year: string, month: string) => void;
};

const EventSearch = ({ onSearch }: EventSearchProps) => {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedYear = yearInputRef.current?.value as string;
    const selectMonth = monthInputRef.current?.value as string;

    onSearch(selectedYear, selectMonth);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Año</label>
          <select id="year" ref={yearInputRef}>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="month">Mes</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
      </div>

      <Button>Buscar eventos</Button>
    </form>
  );
};

export default EventSearch;
