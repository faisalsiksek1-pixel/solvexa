"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useParams } from "next/navigation";
import { Send, Users, ArrowLeft, MessageCircle, X, ImagePlus, Loader2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/utils/cn";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Message = {
  id: string;
  from_id: string;
  from_name: string;
  content: string;
  image_url?: string;
  created_at: string;
};
type Member = { user_id: string; user_name: string; avatar_url: string; };
type Community = { id: string; name: string; description: string; subject: string; created_by: string; };

function MemberProfile({ member, myId, onClose, onDM }: { member: Member; myId: string; onClose: () => void; onDM: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 shadow-2xl">
        <div className="flex justify-end px-4 pt-4">
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-6 pb-6 flex flex-col items-center text-center gap-3">
          <Avatar name={member.user_name} size="xl" src={member.avatar_url || null} />
          <div>
            <p className="font-bold text-slate-900">{member.user_name}</p>
            {member.user_id === myId && <p className="text-xs text-brand-600 mt-0.5">You</p>}
          </div>
          {member.user_id !== myId && (
            <button onClick={onDM}
              className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition w-full justify-center">
              <MessageCircle className="h-4 w-4" /> Send a message
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CommunityChat() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const myId = (session?.user as any)?.id ?? session?.user?.email ?? "";
  const myName = session?.user?.name ?? "User";

  const [community, setCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<{ url: string; file: File } | null>(null);
  const [showMembers, setShowMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;

    supabase.from("communities").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setCommunity(data);
    });

    supabase.from("community_members").select("*").eq("community_id", id).then(({ data }) => {
      if (data) setMembers(data);
    });

    supabase.from("community_messages").select("*").eq("community_id", id)
      .order("created_at", { ascending: true }).then(({ data }) => {
        if (data) setMessages(data);
      });

    const channel = supabase.channel(`community-${id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "community_messages", filter: `community_id=eq.${id}` },
        (payload) => setMessages((prev) => {
          const incoming = payload.new as Message;
          if (prev.some((m) => m.id === incoming.id)) return prev;
          return [...prev, incoming];
        })
      )
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "community_members", filter: `community_id=eq.${id}` },
        (payload) => setMembers((prev) => [...prev, payload.new as Member])
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview({ url, file });
    e.target.value = "";
  }

  async function uploadImage(file: File): Promise<string | null> {
    const ext = file.name.split(".").pop();
    const path = `community/${id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) return null;
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return data.publicUrl;
  }

  async function send() {
    const hasText = input.trim();
    const hasImage = !!imagePreview;
    if ((!hasText && !hasImage) || sending) return;
    setSending(true);

    let image_url = "";
    if (hasImage) {
      setUploadingImage(true);
      image_url = (await uploadImage(imagePreview!.file)) ?? "";
      setUploadingImage(false);
      URL.revokeObjectURL(imagePreview!.url);
      setImagePreview(null);
    }

    const content = input.trim();
    setInput("");

    const optimistic: Message = {
      id: `opt-${Date.now()}`,
      from_id: myId,
      from_name: myName,
      content,
      image_url,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    const { data } = await supabase.from("community_messages").insert({
      community_id: id, from_id: myId, from_name: myName, content, image_url,
    }).select().single();
    if (data) {
      setMessages((prev) => prev.map((m) => m.id === optimistic.id ? data : m));
    }
    setSending(false);
  }

  async function dmMember(member: Member) {
    setSelectedMember(null);
    await supabase.from("messages").insert({
      from_id: myId, to_id: member.user_id, from_name: myName, to_name: member.user_name,
      content: `Hi ${member.user_name.split(" ")[0]}! I saw you in the ${community?.name} community.`,
    });
    router.push("/messages");
  }

  function formatTime(ts: string) {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function formatDate(ts: string) {
    return new Date(ts).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }

  const grouped: { date: string; msgs: Message[] }[] = [];
  for (const m of messages) {
    const date = formatDate(m.created_at);
    const last = grouped[grouped.length - 1];
    if (last?.date === date) last.msgs.push(m);
    else grouped.push({ date, msgs: [m] });
  }

  return (
    <div className="flex h-full" style={{ height: "calc(100vh - 64px)" }}>
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-4 py-3.5 flex items-center gap-3">
          <button onClick={() => router.push("/community")} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 text-sm truncate">{community?.name ?? "Loading…"}</p>
            <p className="text-xs text-slate-400">{community?.subject} · {members.length} members</p>
          </div>
          <button onClick={() => setShowMembers(!showMembers)}
            className={cn("flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition",
              showMembers ? "border-brand-400 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
            )}>
            <Users className="h-3.5 w-3.5" /> Members
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">No messages yet. Say hello!</div>
          )}
          {grouped.map(({ date, msgs }) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">{date}</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <div className="space-y-2">
                {msgs.map((m, i) => {
                  const isMe = m.from_id === myId;
                  const showName = !isMe && (i === 0 || msgs[i - 1]?.from_id !== m.from_id);
                  return (
                    <div key={m.id} className={cn("flex gap-2.5", isMe ? "justify-end" : "justify-start")}>
                      {!isMe && (
                        <button onClick={() => setSelectedMember(members.find((mb) => mb.user_id === m.from_id) ?? { user_id: m.from_id, user_name: m.from_name, avatar_url: "" })}
                          className="shrink-0 mt-auto hover:opacity-80 transition">
                          <Avatar name={m.from_name} size="sm" />
                        </button>
                      )}
                      <div className={cn("max-w-xs lg:max-w-md", isMe && "items-end flex flex-col")}>
                        {showName && <p className="text-xs text-slate-400 mb-1 ml-1">{m.from_name}</p>}
                        <div className={cn(
                          "rounded-2xl text-sm overflow-hidden",
                          isMe ? "bg-brand-600 text-white rounded-br-sm" : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-sm",
                          (m.content || (!m.image_url)) && "px-3.5 py-2.5"
                        )}>
                          {m.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={m.image_url}
                              alt="shared image"
                              className="max-w-full rounded-xl object-cover cursor-pointer"
                              style={{ maxHeight: 260 }}
                              onClick={() => window.open(m.image_url, "_blank")}
                            />
                          )}
                          {m.content && (
                            <span className={cn(m.image_url && "block px-3.5 py-2")}>
                              {m.content}
                            </span>
                          )}
                          <span className={cn(
                            "text-xs",
                            m.image_url && !m.content ? "block px-3 pb-2 pt-1" : "ml-2",
                            isMe ? "text-brand-200" : "text-slate-400"
                          )}>
                            {formatTime(m.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-100 px-4 py-3">
          {/* Image preview */}
          {imagePreview && (
            <div className="mb-2 relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview.url} alt="preview" className="h-20 w-20 rounded-xl object-cover border border-slate-200" />
              <button
                onClick={() => { URL.revokeObjectURL(imagePreview.url); setImagePreview(null); }}
                className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="h-10 w-10 rounded-xl border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-40 shrink-0">
              {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
            </button>
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder={`Message ${community?.name ?? ""}…`}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 focus:bg-white transition" />
            <button onClick={send} disabled={(!input.trim() && !imagePreview) || sending}
              className="h-10 w-10 rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition disabled:opacity-40 shrink-0">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Members panel */}
      {showMembers && (
        <div className="w-56 border-l border-slate-100 bg-white flex flex-col shrink-0">
          <div className="px-4 py-3.5 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Members — {members.length}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {members.map((m) => (
              <button key={m.user_id} onClick={() => setSelectedMember(m)}
                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-slate-50 transition text-left">
                <Avatar name={m.user_name} size="sm" src={m.avatar_url || null} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-800 truncate">{m.user_name}</p>
                  {m.user_id === myId && <p className="text-xs text-brand-500">You</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedMember && (
        <MemberProfile
          member={selectedMember}
          myId={myId}
          onClose={() => setSelectedMember(null)}
          onDM={() => dmMember(selectedMember)}
        />
      )}
    </div>
  );
}
