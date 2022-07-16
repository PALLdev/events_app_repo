import { FC, PropsWithChildren } from "react";
import classes from "./LogisticsItem.module.css";

type LogisticsItemProps = {
  icon: () => JSX.Element;
};

const LogisticsItem: FC<PropsWithChildren<LogisticsItemProps>> = ({
  icon: Icon,
  children,
}) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
