import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import classes from "./Button.module.css";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  href,
  onClick,
  children,
}) => {
  if (!href) {
    return (
      <button onClick={onClick} className={classes.btn}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
};

export default Button;
