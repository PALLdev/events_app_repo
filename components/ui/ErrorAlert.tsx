import { FC, PropsWithChildren } from "react";
import classes from "./ErrorAlert.module.css";

const ErrorAlert: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
