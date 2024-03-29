import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import NavButton from "../components/NavButton";
import { Area } from "@ant-design/plots";
import { Box } from "@mantine/core";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  const config = {
    data: {
      type: "fetch",
      value:
        "https://assets.antv.antgroup.com/g2/unemployment-by-industry.json",
    },
    xField: (d: { date: Date }) => new Date(d.date),
    yField: "unemployed",
    colorField: "industry",
    shapeField: "smooth",
    stack: true, // Try to remove this line.
    theme: "academy",
    legend: {
      color: {
        layout: {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        },
      },
    },
    slider: {
      x: {},
    },
    interaction: {
      tooltip: {
        showCrosshairs: true,
        trailing: true,
        position: "bottom-left",
        css: {
          boxShadow: "none",
          fontFamily: "sans-serif",
        },
      },
    },
  };

  return (
    <div className="p-2">
      <Box h={700}>
        <Area {...config} />
      </Box>
      <NavButton to="/about/me">About Me</NavButton>
      <Outlet />
    </div>
  );
}
