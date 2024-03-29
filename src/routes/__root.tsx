import NavButton from "../components/NavButton";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@mantine/core";
import "@mantine/charts/styles.css";

import React, { Suspense } from "react";
const TanStackRouterDevtoolsLazy =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );
export const Route = createRootRoute({
  component: () => (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: true },
        }}
        padding="md"
      >
        <AppShell.Header>
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <NavButton to="/">Home</NavButton>
          <NavButton to="/about">About</NavButton>
          <NavButton to="/invoices">Invoices</NavButton>
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
          <Suspense>
            <TanStackRouterDevtoolsLazy />
          </Suspense>
        </AppShell.Main>
      </AppShell>
    </>
  ),
});
