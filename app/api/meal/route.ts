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
  const { name, date, mealtime, portion, calories, proteins, carbs, fats } =
    body;

  const { data, error } = await supabase
    .from("meals")
    .insert({
      user_id: user.id,
      name,
      date,
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
