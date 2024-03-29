import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RadarChart } from "@mantine/charts";

import { z } from "zod";
import { TextInput } from "@mantine/core";

const productSearchSchema = z.object({
  page: z.number().catch(1),
  filter: z.string().catch(""),
  sort: z.enum(["newest", "oldest", "price"]).catch("newest"),
});

export const Route = createFileRoute("/invoices/me")({
  component: Invoices,
  validateSearch: (search) => productSearchSchema.parse(search),
});

function Invoices() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { filter } = Route.useSearch();

  const data = [
    {
      product: "Apples",
      sales_january: 120,
      sales_february: 100,
    },
    {
      product: "Oranges",
      sales_january: 98,
      sales_february: 90,
    },
    {
      product: "Tomatoes",
      sales_january: 86,
      sales_february: 70,
    },
    {
      product: "Grapes",
      sales_january: 99,
      sales_february: 80,
    },
    {
      product: filter,
      sales_january: 85,
      sales_february: 120,
    },
    {
      product: "Lemons",
      sales_january: 65,
      sales_february: 150,
    },
  ];
  return (
    <div className="p-2">
      <TextInput
        label="name"
        value={filter}
        onChange={(e) => {
          navigate({
            search: (old) => {
              return {
                ...old,
                filter: e.currentTarget.value,
              };
            },
            replace: true,
          });
        }}
      />
      <RadarChart
        h={300}
        data={data}
        dataKey="product"
        withPolarRadiusAxis
        series={[
          { name: "sales_january", color: "lime.4", opacity: 0.1 },
          { name: "sales_february", color: "cyan.4", opacity: 0.1 },
        ]}
      />
    </div>
  );
}
