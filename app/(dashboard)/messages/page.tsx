"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { Send, MessageCircle } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/utils/cn";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Message = {
  id: string;
  from_id: string;
  to_id: string;
  from_name: string;
  to_name: string;
  content: string;
  created_at: string;
  read: boolean;
};

type Conversation = {
  userId: string;
  name: string;
  lastMessage: string;
  lastAt: string;
  unread: number;
};

export default function MessagesPage() {
  const { data: session } = useSession();
  const myId = (session?.user as any)?.id ?? session?.user?.email ?? "";
  const myName = session?.user?.name ?? "Me";

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load all messages involving me
  useEffect(() => {
    if (!myId) return;

    supabase
      .from("messages")
      .select("*")
      .or(`from_id.eq.${myId},to_id.eq.${myId}`)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setMessages(data);
          buildConversations(data);
        }
      });

    // Realtime subscription
    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const msg = payload.new as Message;
          if (msg.from_id === myId || msg.to_id === myId) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === msg.id)) return prev;
              const updated = [...prev, msg];
              buildConversations(updated);
              return updated;
            });
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [myId]);

  function buildConversations(msgs: Message[]) {
    const map = new Map<string, Conversation>();
    for (const m of msgs) {
      const otherId = m.from_id === myId ? m.to_id : m.from_id;
      const otherName = m.from_id === myId ? m.to_name : m.from_name;
      const existing = map.get(otherId);
      const unread = !m.read && m.to_id === myId ? 1 : 0;
      if (!existing || m.created_at > existing.lastAt) {
        map.set(otherId, {
          userId: otherId,
          name: otherName,
          lastMessage: m.content,
          lastAt: m.created_at,
          unread: (existing?.unread ?? 0) + unread,
        });
      } else if (unread) {
        existing.unread += unread;
      }
    }
    setConversations(Array.from(map.values()).sort((a, b) => b.lastAt.localeCompare(a.lastAt)));
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedId]);

  async function send() {
    if (!input.trim() || !selectedId || sending) return;
    setSending(true);
    const content = input.trim();
    setInput("");
    const conv = conversations.find((c) => c.userId === selectedId);
    const optimistic: Message = {
      id: `opt-${Date.now()}`,
      from_id: myId,
      to_id: selectedId,
      from_name: myName,
      to_name: conv?.name ?? selectedId,
      content,
      created_at: new Date().toISOString(),
      read: true,
    };
    setMessages((prev) => {
      const updated = [...prev, optimistic];
      buildConversations(updated);
      return updated;
    });
    const { data } = await supabase.from("messages").insert({
      from_id: myId,
      to_id: selectedId,
      from_name: myName,
      to_name: conv?.name ?? selectedId,
      content,
    }).select().single();
    if (data) {
      setMessages((prev) => {
        const updated = prev.map((m) => m.id === optimistic.id ? data : m);
        buildConversations(updated);
        return updated;
      });
    }
    setSending(false);
  }

  const chat = messages.filter(
    (m) => (m.from_id === myId && m.to_id === selectedId) || (m.from_id === selectedId && m.to_id === myId)
  );

  const selectedConv = conversations.find((c) => c.userId === selectedId);

  return (
    <div className="flex h-full" style={{ height: "calc(100vh - 64px)" }}>
      {/* Sidebar */}
      <div className="w-72 border-r border-slate-100 bg-white flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-slate-100">
          <h1 className="text-base font-bold text-slate-900">Messages</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <div className="px-5 py-8 text-sm text-slate-400 text-center">No conversations yet.</div>
          )}
          {conversations.map((conv) => (
            <button
              key={conv.userId}
              onClick={() => setSelectedId(conv.userId)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition text-left border-b border-slate-50",
                selectedId === conv.userId && "bg-brand-50 hover:bg-brand-50"
              )}
            >
              <Avatar name={conv.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900 truncate">{conv.name}</p>
                  {conv.unread > 0 && (
                    <span className="ml-2 h-5 w-5 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      {selectedId ? (
        <div className="flex-1 flex flex-col bg-slate-50">
          {/* Chat header */}
          <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-3">
            <Avatar name={selectedConv?.name ?? ""} size="sm" />
            <p className="font-semibold text-slate-900 text-sm">{selectedConv?.name}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {chat.map((m) => {
              const isMe = m.from_id === myId;
              return (
                <div key={m.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm",
                    isMe
                      ? "bg-brand-600 text-white rounded-br-sm"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm"
                  )}>
                    {m.content}
                    <p className={cn("text-xs mt-1", isMe ? "text-brand-200" : "text-slate-400")}>
                      {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Type a message…"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 focus:bg-white transition"
              />
              <button
                onClick={send}
                disabled={!input.trim() || sending}
                className="h-10 w-10 rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center bg-slate-50">
          <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
            <MessageCircle className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-600">Select a conversation</p>
          <p className="text-xs text-slate-400 mt-1">Messages from tutors and students appear here</p>
        </div>
      )}
    </div>
  );
}
