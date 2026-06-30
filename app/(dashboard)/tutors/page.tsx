"use client";

import { useState, useEffect } from "react";
import { Search, X, Star, Clock, MessageCircle, CheckCircle, Users } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/utils/cn";
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SUBJECTS = ["All", "Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry", "Vectors", "Probability"];

type Tutor = {
  id: string;
  name: string;
  avatar_url: string | null;
  tutor_bio: string;
  subjects: string[];
  availability: string[];
};

function MessageModal({ tutor, onClose }: { tutor: Tutor; onClose: () => void }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function send() {
    if (!message.trim() || sending) return;
    setSending(true);
    const myId = (session?.user as any)?.id ?? session?.user?.email ?? "";
    const myName = session?.user?.name ?? "Student";
    await supabase.from("messages").insert({
      from_id: myId,
      to_id: tutor.id,
      from_name: myName,
      to_name: tutor.name,
      content: message.trim(),
    });
    setSent(true);
    setSending(false);
    setTimeout(() => { onClose(); router.push("/messages"); }, 1200);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Avatar name={tutor.name} size="sm" src={tutor.avatar_url} />
            <div>
              <p className="text-sm font-semibold text-slate-900">{tutor.name}</p>
              <p className="text-xs text-slate-500">{tutor.subjects?.join(", ")}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-12 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
            <p className="font-semibold text-slate-900 mb-1">Message sent</p>
            <p className="text-sm text-slate-500">{tutor.name} will reply shortly.</p>
          </div>
        ) : (
          <div className="px-6 py-5">
            <p className="text-xs text-slate-500 mb-3">Introduce yourself and what you need help with:</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${tutor.name.split(" ")[0]}, I need help with…`}
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 focus:bg-white transition resize-none"
              autoFocus
            />
            <div className="mt-4 flex gap-3">
              <button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              <button onClick={send} disabled={!message.trim() || sending}
                className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition disabled:opacity-40">
                {sending ? "Sending…" : "Send message"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BookModal({ tutor, onClose }: { tutor: Tutor; onClose: () => void }) {
  const [selected, setSelected] = useState("");
  const [booked, setBooked] = useState(false);

  const slots = tutor.availability ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Avatar name={tutor.name} size="sm" src={tutor.avatar_url} />
            <div>
              <p className="text-sm font-semibold text-slate-900">Book a session with {tutor.name.split(" ")[0]}</p>
              <p className="text-xs text-emerald-600 font-medium">Free</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {booked ? (
          <div className="px-6 py-12 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
            <p className="font-semibold text-slate-900 mb-1">Session booked</p>
            <p className="text-sm text-slate-500">{selected} with {tutor.name.split(" ")[0]}.</p>
            <button onClick={onClose} className="mt-6 text-sm text-brand-600 hover:text-brand-700 font-medium">Done</button>
          </div>
        ) : slots.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-slate-400">
            This tutor hasn't set their availability yet.
          </div>
        ) : (
          <div className="px-6 py-5">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Available slots</p>
            <div className="space-y-2">
              {slots.map((slot) => (
                <button key={slot} onClick={() => setSelected(slot)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-left transition",
                    selected === slot ? "border-brand-400 bg-brand-50 text-brand-700" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                  )}>
                  <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                  {slot}
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              <button onClick={() => setBooked(true)} disabled={!selected}
                className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition disabled:opacity-40">
                Confirm booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TutorCard({ tutor, onMessage, onBook }: { tutor: Tutor; onMessage: () => void; onBook: () => void }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-4 hover:border-slate-300 hover:shadow-sm transition-all">
      <div className="flex items-center gap-3">
        <Avatar name={tutor.name} size="lg" src={tutor.avatar_url} />
        <div>
          <p className="font-semibold text-slate-900 text-sm">{tutor.name}</p>
          {tutor.availability?.length > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available
            </span>
          )}
        </div>
      </div>

      {tutor.tutor_bio && (
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{tutor.tutor_bio}</p>
      )}

      {tutor.subjects?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tutor.subjects.map((s) => (
            <span key={s} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{s}</span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        <button onClick={onMessage}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
          <MessageCircle className="h-3.5 w-3.5" /> Message
        </button>
        <button onClick={onBook}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2 text-xs font-medium text-white hover:bg-brand-700 transition">
          <Clock className="h-3.5 w-3.5" /> Book session
        </button>
      </div>
    </div>
  );
}

export default function TutorsPage() {
  const { data: session } = useSession();
  const myId = (session?.user as any)?.id ?? session?.user?.email ?? "";

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [messagingTutor, setMessagingTutor] = useState<Tutor | null>(null);
  const [bookingTutor, setBookingTutor] = useState<Tutor | null>(null);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id, name, avatar_url, tutor_bio, subjects, availability")
      .eq("role", "tutor")
      .neq("id", myId)
      .then(({ data }) => {
        if (data) setTutors(data);
        setLoading(false);
      });
  }, [myId]);

  const filtered = tutors.filter((t) => {
    const matchSearch = t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects?.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchSubject = subject === "All" || t.subjects?.includes(subject);
    return matchSearch && matchSubject;
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Tutors</h1>
        <p className="text-sm text-slate-500 mt-1">All sessions are completely free.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or subject…"
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {SUBJECTS.map((s) => (
          <button key={s} onClick={() => setSubject(s)}
            className={cn(
              "rounded-xl border px-3 py-1.5 text-xs font-medium transition",
              subject === s ? "border-brand-400 bg-brand-50 text-brand-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-52 rounded-2xl bg-slate-100 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-600">No tutors yet</p>
          <p className="text-xs text-slate-400 mt-1">Tutors will appear here once they sign up and set up their profile.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor}
              onMessage={() => setMessagingTutor(tutor)}
              onBook={() => setBookingTutor(tutor)} />
          ))}
        </div>
      )}

      {messagingTutor && <MessageModal tutor={messagingTutor} onClose={() => setMessagingTutor(null)} />}
      {bookingTutor && <BookModal tutor={bookingTutor} onClose={() => setBookingTutor(null)} />}
    </div>
  );
}
