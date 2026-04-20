"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, User, Bot, Loader2, ThumbsUp, ThumbsDown } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type FeedbackType = "helpful" | "unclear";

export function FloatingAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const STORAGE_KEY = "ai_tutor_messages_v1";
  const defaultMessages: Message[] = [
    {
      id: "welcome",
      role: "assistant",
      content:
        "Chào bạn! 👋 Mình là trợ lý tiếng Anh AI (A1-A2). Mình có thể giảng thích ngữ pháp, từ vựng hay bất kỳ câu hỏi nào về tiếng Anh. Mình có thể giúp gì cho bạn hôm nay?",
    },
  ];

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      if (typeof window === "undefined") return defaultMessages;
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore and fall back to default
      // eslint-disable-next-line no-console
      console.warn("Failed to read saved chat messages:", e);
    }
    return defaultMessages;
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackByMessageId, setFeedbackByMessageId] = useState<Record<string, FeedbackType>>({});
  const [clarifyingMessageId, setClarifyingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<number | null>(null);

  const getSessionId = () => {
    const storageKey = "ai_tutor_session_id";
    const existingSessionId = window.localStorage.getItem(storageKey);

    if (existingSessionId) return existingSessionId;

    const nextSessionId = crypto.randomUUID();
    window.localStorage.setItem(storageKey, nextSessionId);
    return nextSessionId;
  };

  // Persist messages to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("Failed to save chat messages:", e);
    }
  }, [messages]);

  const clearChat = () => {
    setMessages(defaultMessages);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    // Also try to remove server copy for this session (non-blocking)
    try {
      fetch(`/api/conversations?sessionId=${getSessionId()}`, { method: "DELETE" }).catch(() => null);
    } catch (e) {
      // ignore
    }
  };

  // Load conversation from server if present (session-scoped). Server wins if it has messages.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const sessionId = getSessionId();
        const res = await fetch(`/api/conversations?sessionId=${encodeURIComponent(sessionId)}`);
        if (!res.ok) return;
        const conv = await res.json().catch(() => null);
        if (!mounted) return;
        if (conv?.messages && Array.isArray(conv.messages) && conv.messages.length > 0) {
          setMessages(conv.messages as Message[]);
        }
      } catch (e) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Debounced save to server on messages change (saves by sessionId)
  useEffect(() => {
    try {
      if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    } catch (e) {
      // ignore
    }

    saveTimeoutRef.current = window.setTimeout(async () => {
      try {
        const sessionId = getSessionId();
        await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, messages }),
        });
      } catch (e) {
        // ignore
      }
    }, 1000) as unknown as number;

    return () => {
      try {
        if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
      } catch (e) {
        // ignore
      }
    };
  }, [messages]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const requestAiResponse = async (messageHistory: Message[]) => {
    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messageHistory,
          sessionId: getSessionId(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const status = res.status;

        if (status === 502) {
          return "⚠️ Server AI đang tạm thời không phản hồi (502). Vui lòng thử lại sau ít phút.";
        }

        if (typeof errorData?.message === "string" && errorData.message.trim()) {
          return `⚠️ ${errorData.message.trim()}`;
        }

        return "⚠️ Không gửi được câu hỏi tới AI. Vui lòng thử lại với nội dung ngắn hơn.";
      }

      const data = await res.json();
      return data.text || "Xin lỗi, mình đang gặp sự cố kết nối. Vui lòng thử lại sau.";
    } catch (error) {
      console.error("AI Assistant request failed:", error);
      return "⚠️ Không thể kết nối tới AI lúc này. Vui lòng thử lại sau.";
    }
  };

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Thêm tin nhắn user vào list
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: userMessage };
    const nextMessages = [...messages, newUserMsg];
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const responseText = await requestAiResponse(nextMessages);
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responseText,
        },
      ]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "❌ Rất tiếc, đã có lỗi kết nối máy chủ.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, feedback: FeedbackType) => {
    if (isLoading) return;

    setFeedbackByMessageId((prev) => ({ ...prev, [messageId]: feedback }));

    const targetMessage = messages.find((msg) => msg.id === messageId && msg.role === "assistant");
    if (!targetMessage) return;

    const targetIndex = messages.findIndex((msg) => msg.id === messageId);
    const previousUserMessage = [...messages]
      .slice(0, targetIndex)
      .reverse()
      .find((msg) => msg.role === "user");

    // Send feedback to server for both helpful and unclear
    setIsLoading(true);
    try {
      // try to get logged-in user id
      let userId: string | null = null;
      try {
        const meRes = await fetch("/api/me");
        if (meRes.ok) {
          const meData = await meRes.json().catch(() => null);
          userId = meData?.status === "success" && meData?.user?.id ? meData.user.id : null;
        }
      } catch (e) {
        // ignore
      }

      const payload = {
        query: previousUserMessage?.content || "",
        response: targetMessage.content,
        liked: feedback === "helpful",
        // legacy fields for server compatibility
        messageId,
        assistantContent: targetMessage.content,
        previousUserInput: previousUserMessage?.content || null,
        sessionId: getSessionId(),
        user_id: userId,
        feedback_type: "explicit_command",
        command: feedback === "helpful" ? "like" : "dislike",
        correction: null,
        metadata: {
          message_id: messageId,
          session_id: getSessionId(),
          intent: null,
          source: "AI_TUTOR",
        },
        timestamp: new Date().toISOString(),
      } as const;

      const resp = await fetch("/api/ai-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await resp.json().catch(() => null);
      console.log("/api/ai-feedback response:", json);
    } catch (err) {
      console.error("Failed to send AI feedback:", err);
    } finally {
      setIsLoading(false);
    }

    // If feedback is 'unclear' (i.e. 'Không hữu ích'), do NOT request clarification and return early
    if (feedback === "unclear") {
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end">
      {/* Cửa sổ chat */}
      <div
        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden transition-all origin-bottom-right mb-4 flex flex-col ${
          isOpen ? "scale-100 opacity-100 w-87.5 h-125" : "scale-0 opacity-0 w-0 h-0 hidden"
        }`}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-4 shrink-0 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">AI Tutor</h3>
              <p className="text-[11px] text-blue-100">Hỗ trợ Học viên A1-A2</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/20 rounded-full transition"
              aria-label="Xóa lịch sử chat"
              title="Xóa lịch sử chat"
            >
              <span aria-hidden>🗑</span>
            </button>
            <button
              onClick={toggleChat}
              className="p-2 hover:bg-white/20 rounded-full transition"
              aria-label="Đóng chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            const feedback = feedbackByMessageId[msg.id];
            const canShowFeedback = msg.role === "assistant" && msg.id !== "welcome";
            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                <div
                  className={`size-8 shrink-0 rounded-full flex items-center justify-center ${
                    isUser
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                      : "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                  }`}
                >
                  {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
                </div>

                <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl w-full text-sm shadow-sm ${
                      isUser
                        ? "bg-blue-600 text-white rounded-tr-sm"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-sm whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {canShowFeedback ? (
                    <div className="mt-2 px-1 text-xs text-slate-500 dark:text-slate-400">
                      <p className="mb-2">Đánh giá câu trả lời này:</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, "helpful")}
                          disabled={isLoading}
                          className={`rounded-full border px-3 py-1.5 transition flex items-center gap-1.5 ${
                            feedback === "helpful"
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-slate-300 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                          } ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          Câu trả lời tốt
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, "unclear")}
                          disabled={isLoading}
                          className={`rounded-full border px-3 py-1.5 transition flex items-center gap-1.5 ${
                            feedback === "unclear"
                              ? "border-amber-500 bg-amber-500 text-white"
                              : "border-slate-300 bg-white text-slate-600 hover:border-amber-400 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                          } ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          Câu trả lời tệ
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex gap-3">
              <div className="size-8 shrink-0 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center">
                <Bot className="size-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <form
            onSubmit={sendMessage}
            className="flex items-end gap-2 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 dark:focus-within:border-blue-500 transition-all"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi AI bất kỳ điều gì..."
              className="flex-1 max-h-25 min-h-10 bg-transparent border-0 resize-none px-3 py-2 text-sm focus:ring-0 outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              aria-label="Gửi tin nhắn"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>

      {/* Nút bấm trôi (FAB) */}
      <button
        onClick={toggleChat}
        className={`group relative flex items-center justify-center size-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 ${
          isOpen ? "scale-0 hidden" : "scale-100"
        }`}
        aria-label="Mở AI Assistant"
      >
        <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Tooltip */}
        <span className="absolute right-[calc(100%+12px)] px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          AI Tutor (A1-A2)
          {/* Mũi tên tooltip */}
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-[5px] border-transparent border-l-slate-900 dark:border-l-slate-100"></span>
        </span>
      </button>
    </div>
  );
}
