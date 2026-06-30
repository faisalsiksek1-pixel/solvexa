"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Plus, Search, Users, X, Hash, Lock, Globe } from "lucide-react";
import { cn } from "@/utils/cn";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Community = {
  id: string;
  name: string;
  description: string;
  subject: string;
  created_by: string;
  created_by_name: string;
  created_at: string;
  is_private: boolean;
  passcode: string;
};

function CreateModal({ onClose, onCreate }: { onClose: () => void; onCreate: (c: Community) => void }) {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [creating, setCreating] = useState(false);

  async function create() {
    if (!name.trim() || creating) return;
    if (isPrivate && !passcode.trim()) return;
    setCreating(true);
    const myId = (session?.user as any)?.id ?? session?.user?.email ?? "";
    const myName = session?.user?.name ?? "User";
    const { data, error } = await supabase.from("communities").insert({
      name: name.trim(),
      description: description.trim(),
      subject: "General",
      created_by: myId,
      created_by_name: myName,
      is_private: isPrivate,
      passcode: isPrivate ? passcode.trim() : "",
    }).select().single();
    if (!error && data) {
      await supabase.from("community_members").insert({ community_id: data.id, user_id: myId, user_name: myName });
      onCreate(data);
    }
    setCreating(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Create a community</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. A-Level Maths Help"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 focus:bg-white transition" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What's this community about?" rows={2}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 focus:bg-white transition resize-none" />
          </div>

          {/* Public / Private toggle */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">Visibility</label>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setIsPrivate(false)}
                className={cn("flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition",
                  !isPrivate ? "border-brand-400 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600 hover:bg-slate-50")}>
                <Globe className="h-4 w-4 shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-xs">Public</p>
                  <p className="text-xs opacity-60">Anyone can join</p>
                </div>
              </button>
              <button type="button" onClick={() => setIsPrivate(true)}
                className={cn("flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition",
                  isPrivate ? "border-brand-400 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600 hover:bg-slate-50")}>
                <Lock className="h-4 w-4 shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-xs">Private</p>
                  <p className="text-xs opacity-60">Passcode required</p>
                </div>
              </button>
            </div>
          </div>

          {isPrivate && (
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Passcode</label>
              <input value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Set a passcode for members"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 focus:bg-white transition" />
              <p className="text-xs text-slate-400 mt-1.5">Share this with people you want to invite.</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">Cancel</button>
            <button onClick={create} disabled={!name.trim() || creating || (isPrivate && !passcode.trim())}
              className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition disabled:opacity-40">
              {creating ? "Creating…" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasscodeModal({ community, onClose, onSuccess }: { community: Community; onClose: () => void; onSuccess: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  function check() {
    if (input.trim() === community.passcode) {
      onSuccess();
    } else {
      setError("Wrong passcode. Try again.");
      setInput("");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-900">Private community</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-slate-500">Enter the passcode to join <span className="font-medium text-slate-800">{community.name}</span>.</p>
          <input value={input} onChange={(e) => { setInput(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="Passcode" type="password"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 focus:bg-white transition" />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">Cancel</button>
            <button onClick={check} disabled={!input.trim()}
              className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition disabled:opacity-40">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const myId = (session?.user as any)?.id ?? session?.user?.email ?? "";

  const [communities, setCommunities] = useState<Community[]>([]);
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passcodeTarget, setPasscodeTarget] = useState<Community | null>(null);

  useEffect(() => {
    if (!myId) return;
    Promise.all([
      supabase.from("communities").select("*").order("created_at", { ascending: false }),
      supabase.from("community_members").select("community_id").eq("user_id", myId),
      supabase.from("community_members").select("community_id"),
    ]).then(([{ data: comms }, { data: joined }, { data: allMembers }]) => {
      if (comms) setCommunities(comms);
      if (joined) setJoinedIds(new Set(joined.map((j: any) => j.community_id)));
      if (allMembers) {
        const counts: Record<string, number> = {};
        allMembers.forEach((m: any) => { counts[m.community_id] = (counts[m.community_id] ?? 0) + 1; });
        setMemberCounts(counts);
      }
      setLoading(false);
    });
  }, [myId]);

  async function joinCommunity(community: Community) {
    await supabase.from("community_members").insert({ community_id: community.id, user_id: myId, user_name: session?.user?.name ?? "User" });
    setJoinedIds((prev) => new Set([...prev, community.id]));
    setMemberCounts((prev) => ({ ...prev, [community.id]: (prev[community.id] ?? 0) + 1 }));
  }

  async function leaveCommunity(community: Community) {
    await supabase.from("community_members").delete().eq("community_id", community.id).eq("user_id", myId);
    setJoinedIds((prev) => { const n = new Set(prev); n.delete(community.id); return n; });
    setMemberCounts((prev) => ({ ...prev, [community.id]: Math.max(0, (prev[community.id] ?? 1) - 1) }));
  }

  function handleJoinClick(community: Community) {
    if (community.is_private && community.created_by !== myId) {
      setPasscodeTarget(community);
    } else {
      joinCommunity(community);
    }
  }

  function handleOpenChat(community: Community) {
    const joined = joinedIds.has(community.id);
    if (!joined) {
      if (community.is_private && community.created_by !== myId) {
        setPasscodeTarget(community);
        return;
      }
      joinCommunity(community);
    }
    router.push(`/community/${community.id}`);
  }

  const filtered = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Community</h1>
          <p className="text-sm text-slate-500 mt-1">Join groups, chat with other students, get help.</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition">
          <Plus className="h-4 w-4" /> New community
        </button>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search communities…"
          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-44 rounded-2xl bg-slate-100 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400 text-sm">No communities yet. Create one!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => {
            const joined = joinedIds.has(c.id);
            return (
              <div key={c.id} className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3 hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <Hash className="h-5 w-5 text-brand-600" />
                  </div>
                  <span className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg",
                    c.is_private ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500")}>
                    {c.is_private ? <><Lock className="h-3 w-3" /> Private</> : <><Globe className="h-3 w-3" /> Public</>}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{c.name}</h3>
                  {c.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{c.description}</p>}
                  <p className="text-xs text-slate-400 mt-1">by {c.created_by_name}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Users className="h-3.5 w-3.5" />
                  {memberCounts[c.id] ?? 0} members
                </div>
                <div className="flex gap-2 mt-auto">
                  {joined ? (
                    <button onClick={() => leaveCommunity(c)}
                      className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
                      Leave
                    </button>
                  ) : (
                    <button onClick={() => handleJoinClick(c)}
                      className="flex-1 rounded-xl border border-brand-400 bg-brand-50 py-2 text-xs font-medium text-brand-700 hover:bg-brand-100 transition">
                      {c.is_private ? "Enter passcode" : "Join"}
                    </button>
                  )}
                  <button onClick={() => handleOpenChat(c)}
                    className="flex-1 rounded-xl bg-brand-600 py-2 text-xs font-medium text-white hover:bg-brand-700 transition">
                    Open chat
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onCreate={(c) => {
            setCommunities((prev) => [c, ...prev]);
            setJoinedIds((prev) => new Set([...prev, c.id]));
            setMemberCounts((prev) => ({ ...prev, [c.id]: 1 }));
          }}
        />
      )}

      {passcodeTarget && (
        <PasscodeModal
          community={passcodeTarget}
          onClose={() => setPasscodeTarget(null)}
          onSuccess={() => {
            joinCommunity(passcodeTarget);
            router.push(`/community/${passcodeTarget.id}`);
            setPasscodeTarget(null);
          }}
        />
      )}
    </div>
  );
}
