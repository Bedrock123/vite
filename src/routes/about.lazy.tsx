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

  const config2 = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/energy.json",
    },
    scale: {
      color: {
        range: [
          "#4e79a7",
          "#f28e2c",
          "#e15759",
          "#76b7b2",
          "#59a14f",
          "#edc949",
          "#af7aa1",
          "#ff9da7",
          "#9c755f",
          "#bab0ab",
        ],
      },
    },
    layout: { nodeAlign: "center", nodePadding: 0.03 },
    style: {
      labelSpacing: 3,
      labelFontWeight: "bold",
      nodeStrokeWidth: 1.2,
      linkFillOpacity: 0.4,
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
