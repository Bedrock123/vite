import { createLazyFileRoute } from "@tanstack/react-router";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "../database.types.";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  "https://fghdtagzwuuutffeirjr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnaGR0YWd6d3V1dXRmZmVpcmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1OTI2OTMsImV4cCI6MjAyNzE2ODY5M30.68CGRbS-q570EjLGeDAVQP4aEwrKbqCqrZ3qqoZuXT0"
);

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
      },
      () => fetchData()
    )
    .subscribe();
  const [keywords, setKeywords] = useState<any[]>([]);
  const fetchData = async () => {
    const keywords = await supabase
      .from("keywords")
      .select(
        `
        
        name
        `
      )
      .order("id", { ascending: true });
    if (!!keywords?.data) {
      setKeywords(keywords.data.map((keyword) => keyword.name));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <p>Keywords:</p>
      <ul>
        {keywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
    </div>
  );
}
