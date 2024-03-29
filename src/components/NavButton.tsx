import { Button } from "@mantine/core";
import { Link, ParseRoute } from "@tanstack/react-router";
import classes from "./NavButton.module.css";
import { routeTree } from "../routeTree.gen";

export default function NavButton({
  children,
  to,
}: {
  children: React.ReactNode;
  to: ParseRoute<typeof routeTree>["fullPath"];
}) {
  return (
    <Button
      component={Link}
      to={to}
      preload="intent"
      className={classes.navButton}
    >
      {children}
    </Button>
  );
}
