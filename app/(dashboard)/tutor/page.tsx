"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Clock, BookOpen, MessageCircle, Check, X, Plus,
  LogOut, Users, Star, Pencil
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { getTutorProfile, saveTutorProfile, checkIsTutor } from "./actions";
import { cn } from "@/utils/cn";

const ALL_SUBJECTS = ["Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry", "Vectors", "Probability"];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["8am–10am", "10am–12pm", "12pm–2pm", "2pm–4pm", "4pm–6pm", "6pm–8pm", "8pm–10pm"];

// Mock incoming session requests
const MOCK_REQUESTS = [
  { id: 1, student: "Yusuf Al Mansoori", subject: "Calculus", message: "I need help with integration by parts.", slot: "Mon 4–6pm", status: "pending" },
  { id: 2, student: "Priya Singh", subject: "Algebra", message: "Struggling with quadratic inequalities.", slot: "Wed 6–8pm", status: "pending" },
  { id: 3, student: "Jake Thompson", subject: "Statistics", message: "Need help understanding hypothesis testing.", slot: "Sat 10am–12pm", status: "confirmed" },
];

export default function TutorDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const [bio, setBio] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [editingProfile, setEditingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "availability" | "requests">("overview");

  useEffect(() => {
    checkIsTutor().then((isTutor) => {
      if (!isTutor) {
        router.replace("/dashboard");
        return;
      }
      setAuthorized(true);
      getTutorProfile().then((p) => {
        if (p) {
          setBio(p.tutor_bio ?? "");
          setSubjects(p.subjects ?? []);
          setAvailability(p.availability ?? []);
          setAvatarUrl(p.avatar_url ?? null);
        }
        setLoading(false);
      });
    });
  }, []);

  async function saveProfile() {
    setSaving(true);
    const result = await saveTutorProfile({ tutor_bio: bio, subjects, availability });
    setSaveMsg(result.error ? "Failed to save." : "Saved.");
    setTimeout(() => setSaveMsg(""), 2000);
    setSaving(false);
    setEditingProfile(false);
  }

  function toggleSlot(slot: string) {
    setAvailability((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  }

  function toggleSubject(s: string) {
    setSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function handleRequest(id: number, action: "confirm" | "decline") {
    setRequests((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: action === "confirm" ? "confirmed" : "declined" } : r)
    );
  }

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-slate-100 rounded-lg" />
        <div className="h-48 bg-slate-100 rounded-2xl" />
      </div>
    );
  }

  if (!authorized) return null;

  const confirmedSessions = requests.filter((r) => r.status === "confirmed").length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar name={session?.user?.name ?? "T"} size="lg" src={avatarUrl} />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{session?.user?.name}</h1>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Tutor</span>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-500 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Confirmed sessions", value: confirmedSessions, icon: BookOpen, color: "text-brand-600 bg-brand-50" },
          { label: "Pending requests", value: pendingRequests, icon: Clock, color: "text-amber-600 bg-amber-50" },
          { label: "Subjects", value: subjects.length, icon: Star, color: "text-emerald-600 bg-emerald-50" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className={cn("inline-flex h-9 w-9 items-center justify-center rounded-xl mb-3", color)}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
        {(["overview", "availability", "requests"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium capitalize transition",
              activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab}
            {tab === "requests" && pendingRequests > 0 && (
              <span className="ml-2 bg-amber-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {pendingRequests}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === "overview" && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-slate-900">Your profile</h2>
            {!editingProfile ? (
              <button onClick={() => setEditingProfile(true)} className="flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 font-medium">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => setEditingProfile(false)} className="text-xs text-slate-500 hover:text-slate-700">Cancel</button>
                <button onClick={saveProfile} disabled={saving} className="text-xs font-medium text-brand-600 hover:text-brand-700 disabled:opacity-50">
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            )}
          </div>

          {saveMsg && (
            <div className="mb-4 text-xs text-emerald-600 bg-emerald-50 rounded-xl px-3 py-2">{saveMsg}</div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Bio</label>
              {editingProfile ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell students about yourself…"
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 resize-none transition"
                />
              ) : (
                <p className="text-sm text-slate-600">{bio || "No bio yet."}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Subjects</label>
              {editingProfile ? (
                <div className="flex flex-wrap gap-2">
                  {ALL_SUBJECTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSubject(s)}
                      className={cn(
                        "rounded-xl border px-3 py-1.5 text-xs font-medium transition",
                        subjects.includes(s)
                          ? "border-brand-400 bg-brand-50 text-brand-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {subjects.length === 0 ? (
                    <p className="text-sm text-slate-400">No subjects set.</p>
                  ) : subjects.map((s) => (
                    <span key={s} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Availability tab */}
      {activeTab === "availability" && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-slate-900">Weekly availability</h2>
            <button
              onClick={saveProfile}
              disabled={saving}
              className="text-xs font-medium text-brand-600 hover:text-brand-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
          {saveMsg && (
            <div className="mb-4 text-xs text-emerald-600 bg-emerald-50 rounded-xl px-3 py-2">{saveMsg}</div>
          )}
          <p className="text-xs text-slate-500 mb-4">Tap a slot to toggle your availability. Students will only see your open slots.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 text-slate-400 font-medium w-28">Time</th>
                  {DAYS.map((d) => (
                    <th key={d} className="text-center py-2 px-1 text-slate-500 font-medium">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMES.map((time) => (
                  <tr key={time} className="border-t border-slate-50">
                    <td className="py-2 pr-4 text-slate-400">{time}</td>
                    {DAYS.map((day) => {
                      const slot = `${day} ${time}`;
                      const active = availability.includes(slot);
                      return (
                        <td key={day} className="py-1.5 px-1 text-center">
                          <button
                            onClick={() => toggleSlot(slot)}
                            className={cn(
                              "h-7 w-full rounded-lg transition text-xs font-medium",
                              active
                                ? "bg-brand-600 text-white"
                                : "bg-slate-100 text-slate-300 hover:bg-slate-200"
                            )}
                          >
                            {active ? "✓" : ""}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Requests tab */}
      {activeTab === "requests" && (
        <div className="space-y-3">
          {requests.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">No session requests yet.</div>
          )}
          {requests.map((req) => (
            <div key={req.id} className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Avatar name={req.student} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{req.student}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{req.subject} · {req.slot}</p>
                    <p className="text-sm text-slate-600 mt-2">{req.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleRequest(req.id, "decline")}
                        className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRequest(req.id, "confirm")}
                        className="p-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {req.status === "confirmed" && (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Confirmed</span>
                  )}
                  {req.status === "declined" && (
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Declined</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
