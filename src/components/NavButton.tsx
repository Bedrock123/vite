import { Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import classes from "./NavButton.module.css";

export default function NavButton({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <Button
      component={Link}
      to={to}
      className={classes.navButton}
    >
      {children}
    </Button>
  );
}
