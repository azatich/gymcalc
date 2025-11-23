import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, age, gender, height, weight, activity_level, goal } = body;

  console.log("user:", user.id);
  console.log("body:", body);

  // Use upsert instead of update - handles both insert and update
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: user.id,
        full_name: name,
        age,
        gender,
        height,
        weight,
        activity_level,
        goal,
      },
      {
        onConflict: "user_id", // Make sure user_id is unique in your table
        ignoreDuplicates: false, // Update if exists
      }
    )
    .select()
    .single();

  console.log("data:", data);
  console.log("error:", error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    // Если профиль не найден, возвращаем null вместо ошибки
    if (error.code === "PGRST116") {
      return NextResponse.json({ data: null }, { status: 200 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
