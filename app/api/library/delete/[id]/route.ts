import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
  }

  const { error } = await supabase
    .from("foods_library")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Deleted successfully" },
    { status: 200 }
  );
}
