import { createClient } from '@supabase/supabase-js';
import { Database } from "../src/database.types.";

export async function onRequest(context) {
    const supabase = createClient<Database>(
        "https://xmzjxqgluoksbhgfzvqt.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhtemp4cWdsdW9rc2JoZ2Z6dnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MjI3NjAsImV4cCI6MjAyNzI5ODc2MH0.y1QYlePIKKMMXJjrUQ5_2dfAYe1yVIqP1VqvVkHCifY"
      );

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
      .eq("targeting_keyword", "cleancult")

      .order("date", { ascending: true })
      .limit(250);

    return Response.json({data: targets?.data})
  }