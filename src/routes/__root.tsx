import NavButton from "../components/NavButton";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppShell } from "@mantine/core";

export const Route = createRootRoute({
  component: () => (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: false },
        }}
        padding="md"
      >
        <AppShell.Header>
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          {" "}
          <NavButton to="/">Home</NavButton>
          <NavButton to="/about">About</NavButton>
        </AppShell.Navbar>

        <AppShell.Main>
          {" "}
          <Outlet />
          <TanStackRouterDevtools />
        </AppShell.Main>
      </AppShell>
    </>
  ),
});
