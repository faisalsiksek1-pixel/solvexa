"use server";

import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getTutorProfile() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return data;
}

export async function saveTutorProfile(data: {
  tutor_bio: string;
  subjects: string[];
  availability: string[];
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { error: "Not authenticated" };

  const { error } = await supabase.from("profiles").upsert(
    { id: userId, ...data, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );

  if (error) return { error: error.message };
  return { success: true };
}

export async function checkIsTutor() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return false;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  return data?.role === "tutor";
}
