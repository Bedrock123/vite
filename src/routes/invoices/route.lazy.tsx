import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import NavButton from "../../components/NavButton";

export const Route = createLazyFileRoute("/invoices")({
  component: Invoices,
});

function Invoices() {
  return (
    <div className="p-2">
      <NavButton to="/invoices/me">About Me</NavButton>
      <Outlet />
    </div>
  );
}
