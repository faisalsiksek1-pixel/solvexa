"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, School, MapPin, Pencil, Check, X, AlignLeft, LogOut, Camera, Loader2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useSession, signOut } from "next-auth/react";
import { saveProfile, getProfile } from "./actions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const COUNTRIES = ["United Arab Emirates", "Brazil", "United Kingdom", "United States", "Other"];
const GRADES = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];

type Profile = {
  name: string;
  email: string;
  school: string;
  grade: string;
  country: string;
  bio: string;
  avatar_url: string;
};

const empty: Profile = { name: "", email: "", school: "", grade: "", country: "United Arab Emirates", bio: "", avatar_url: "" };

export default function ProfilePage() {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState<Profile>(empty);
  const [draft, setDraft] = useState<Profile>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProfile().then((data) => {
      if (data) {
        const p: Profile = {
          name: data.name ?? session?.user?.name ?? "",
          email: data.email ?? session?.user?.email ?? "",
          school: data.school ?? "",
          grade: data.grade ?? "",
          country: data.country ?? "United Arab Emirates",
          bio: data.bio ?? "",
          avatar_url: data.avatar_url ?? "",
        };
        setSaved(p);
        setDraft(p);
      } else {
        const p = { ...empty, name: session?.user?.name ?? "", email: session?.user?.email ?? "" };
        setSaved(p);
        setDraft(p);
      }
      setLoading(false);
    });
  }, [session]);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);

    const ext = file.name.split(".").pop();
    const fileName = `${session?.user?.email ?? "user"}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true });
    if (error) { setSaveError("Upload failed: " + error.message); setUploadingAvatar(false); return; }

    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
    const avatar_url = urlData.publicUrl;

    const updated = { ...saved, avatar_url };
    await saveProfile(updated);
    setSaved(updated);
    setDraft(updated);
    setUploadingAvatar(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startEdit() { setDraft(saved); setEditing(true); setSaveError(""); }

  async function save() {
    setSaving(true);
    setSaveError("");
    const result = await saveProfile(draft);
    if (result.error) { setSaveError(result.error); }
    else { setSaved(draft); setEditing(false); }
    setSaving(false);
  }

  function cancel() { setDraft(saved); setEditing(false); setSaveError(""); }

  if (loading) {
    return (
      <div className="p-8 max-w-lg mx-auto space-y-4 animate-pulse">
        <div className="h-8 w-32 bg-slate-100 rounded-lg" />
        <div className="h-64 bg-slate-100 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        {!editing ? (
          <button onClick={startEdit} className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button onClick={cancel} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
              <X className="h-3.5 w-3.5" /> Cancel
            </button>
            <button onClick={save} disabled={saving} className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors disabled:opacity-50">
              <Check className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save"}
            </button>
          </div>
        )}
      </div>

      {saveError && (
        <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{saveError}</div>
      )}

      <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors mb-6">
        <LogOut className="h-4 w-4" /> Sign out
      </button>

      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-8">
        <div className="flex items-center gap-5 mb-8">
          {/* Avatar with upload button */}
          <div className="relative shrink-0">
            <Avatar name={saved.name || "?"} size="xl" src={saved.avatar_url || null} />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-brand-600 text-white flex items-center justify-center shadow border-2 border-white hover:bg-brand-700 transition disabled:opacity-60"
              title="Change photo"
            >
              {uploadingAvatar ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Camera className="h-3.5 w-3.5" />}
            </button>
          </div>

          {editing ? (
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition" />
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold text-slate-900">{saved.name}</h2>
              {saved.grade && <p className="text-sm text-slate-500">{saved.grade}</p>}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <Field icon={<Mail className="h-4 w-4 text-slate-400 shrink-0" />} label="Email" value={saved.email || "—"} editing={editing}
            input={<input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition" />} />
          <Field icon={<School className="h-4 w-4 text-slate-400 shrink-0" />} label="School" value={saved.school || "—"} editing={editing}
            input={<input value={draft.school} onChange={(e) => setDraft({ ...draft, school: e.target.value })} placeholder="Your school" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition" />} />
          <Field icon={<MapPin className="h-4 w-4 text-slate-400 shrink-0" />} label="Country" value={saved.country || "—"} editing={editing}
            input={<select value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition bg-white">{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select>} />
          <Field icon={<span className="text-slate-400 text-xs font-medium shrink-0 w-4 text-center">#</span>} label="Grade" value={saved.grade || "—"} editing={editing}
            input={<select value={draft.grade} onChange={(e) => setDraft({ ...draft, grade: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition bg-white">{GRADES.map((g) => <option key={g}>{g}</option>)}</select>} />
          <Field icon={<AlignLeft className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />} label="Bio" value={saved.bio || "No bio yet."} editing={editing}
            input={<textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} placeholder="Tell us a bit about yourself…" rows={3} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition resize-none" />} />
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, value, editing, input }: {
  icon: React.ReactNode; label: string; value: string; editing: boolean; input: React.ReactNode;
}) {
  if (editing) return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      {input}
    </div>
  );
  return (
    <div className="flex items-start gap-3 text-sm text-slate-600">
      {icon}
      <span>{value}</span>
    </div>
  );
}
