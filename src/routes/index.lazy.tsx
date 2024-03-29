import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Line } from "@ant-design/plots";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "../database.types.";
import { Box, Table, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { z } from "zod";
const searchSchema = z.object({
  search: z.string().catch(""),
});
// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  "https://xmzjxqgluoksbhgfzvqt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhtemp4cWdsdW9rc2JoZ2Z6dnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MjI3NjAsImV4cCI6MjAyNzI5ODc2MH0.y1QYlePIKKMMXJjrUQ5_2dfAYe1yVIqP1VqvVkHCifY"
);

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search) => searchSchema.parse(search),
});

function Index() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { search } = Route.useSearch();

  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 500);

  const [targets, setTargets] = useState<any[]>([]);
  const fetchData = async (search: string) => {
    const targets = await supabase
      .from("sp_targeting")
      .select(
        `
        id,
        targeting_keyword,
        date,
        spend
        `
      )
      .neq("targeting_keyword", null)
      .eq("targeting_keyword", search)

      .order("date", { ascending: true })
      .limit(250);

    if (!!targets?.data) {
      setTargets(targets.data.map((target) => target));
    }
  };

  useEffect(() => {
    if (!!debounced && debounced !== "") {
      fetchData(debounced);
    }
  }, [debounced]);

  useEffect(() => {
    if (search !== "") {
      fetchData(search);
    }
  }, []);

  useEffect(() => {
    setValue(search);
  }, [search]);

  const createValues = () => {
    if (targets.length > 0) {
      // Object to hold the sum of spend for each date
      let sumsByDate = {} as any;

      // Iterate over each target to group by date and sum the spend
      targets.forEach((target) => {
        const { date, spend } = target;

        // If the date already exists in the sumsByDate object, add to the sum. Otherwise, initialize it.
        if (sumsByDate[date]) {
          sumsByDate[date] += spend;
        } else {
          sumsByDate[date] = spend;
        }
      });

      // Convert the sumsByDate object back into an array of objects
      let targetChart = Object.entries(sumsByDate).map(([date, spend]) => ({
        date,
        spend,
        // The targeting_keyword is not included here because the function sums spend by date regardless of the keyword.
        // If you need to include targeting_keyword, you'd have to adjust the grouping logic to account for it as well.
      }));

      return targetChart;
    }
    return [];
  };

  const config = {
    data: createValues(),
    xField: (d: { date: Date }) => new Date(d.date),
    yField: "spend",
    colorField: "targeting_keyword",
    shapeField: "smooth",
    stack: true, // Try to remove this line.
    theme: "academy",
    axis: {
      x: {
        title: "Date",
        labelAutoHide: false,
      },
      y: {
        title: "Spend",
      },
    },
    interaction: {
      tooltip: true,
    },
  };
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <TextInput
        placeholder="Search"
        mb={30}
        value={search}
        onChange={(e) => {
          navigate({
            search: (old) => {
              return {
                ...old,
                search: e.currentTarget.value,
              };
            },
            replace: true,
          });
        }}
      />
      <Box h={400}>
        <Line {...config} />
      </Box>

      <Table
        variant=""
        stickyHeader
        stickyHeaderOffset={60}
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Keyword</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Spend</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {targets.map((target) => (
            <Table.Tr key={target.id}>
              <Table.Td>{target.targeting_keyword}</Table.Td>
              <Table.Td>{target.date}</Table.Td>
              <Table.Td>{target.spend}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
