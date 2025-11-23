"use server";

import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, calories, proteins, carbs, fats, category_id, portion } =
    body;

  const { data, error } = await supabase
    .from("foods_library")
    .insert({   
      user_id: user?.id,
      name,
      calories_per_100g: calories,
      proteins_per_100g: proteins,
      carbs_per_100g: carbs,
      fat_per_100g: fats,
      category_id,
      portion,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
