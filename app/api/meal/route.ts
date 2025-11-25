import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await req.json();
  const { name, time, mealtime, portion, calories, proteins, carbs, fats } =
    body;

  const { data, error } = await supabase
    .from("meals")
    .insert({
      user_id: user.id,
      name,
      time,
      portion,
      proteins,
      fats,
      carbs,
      calories,
      mealtime,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function GET(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user || userError) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const timezoneOffset = searchParams.get("offset") || "+05:00";

  let query = supabase.from("meals").select("*").eq("user_id", user.id);

  if (date) {
    const startOfDay = `${date}T00:00:00${timezoneOffset}`;
    const endOfDay = `${date}T23:59:59.999${timezoneOffset}`;
    query = query.gte("created_at", startOfDay).lte("created_at", endOfDay);
  }
  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
