import { FC, PropsWithChildren } from "react";
import classes from "./EventContent.module.css";

const EventContent: FC<PropsWithChildren> = ({ children }) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;
