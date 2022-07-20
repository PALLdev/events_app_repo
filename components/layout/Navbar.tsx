import Link from "next/link";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">EventosNext</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">Todos los eventos</Link>
          </li>
          <li>
            <Link href="/feedback">Enviar feedback</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
