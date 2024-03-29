import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import NavButton from "../components/NavButton";
import { Area } from "@ant-design/plots";
import { Box, Grid } from "@mantine/core";
import { Column } from "@ant-design/plots";

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

  const config3 = {
    data: {
      type: "fetch",
      value:
        "https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/column-bar-dodged.json",
    },
    xField: "state",
    yField: "population",
    colorField: "age",
    group: true,
    sort: {
      reverse: true,
      by: "y",
    },
    axis: {
      y: { labelFormatter: "~s" },
    },
    interaction: {
      tooltip: { shared: true },
      elementHighlightByColor: { background: true },
    },
  } as any;

  return (
    <div className="p-2">
      <Grid columns={24}>
        <Grid.Col span={12}>
          <Box h={700}>
            <Area {...config} />
          </Box>
        </Grid.Col>
        <Grid.Col span={12}>
          <Box h={700}>
            <Column {...config3} />
          </Box>
        </Grid.Col>
      </Grid>

      <NavButton to="/about/me">About Me</NavButton>
      <Outlet />
    </div>
  );
}
