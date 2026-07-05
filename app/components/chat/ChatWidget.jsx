"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChatWidget.module.css";

function getSessionId() {
  if (typeof window === "undefined") return null;
  let id = localStorage.getItem("chat_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chat_session_id", id);
  }
  return id;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [awaitingTicket, setAwaitingTicket] = useState(false);
  const [ticketDraft, setTicketDraft] = useState({ name: "", email: "", message: "" });
  const [ticketConfirmation, setTicketConfirmation] = useState(null);
  const sessionId = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    sessionId.current = getSessionId();
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((d) => setFaqs(d.faqs || []))
      .catch(() => setFaqs([]));

    setMessages([
      {
        sender: "bot",
        text: "Hi! I'm the support bot. Tap a topic below or type your question.",
      },
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, awaitingTicket]);

  async function sendMessage(text, faqId = null) {
    if (!text.trim() || sending) return;
    setMessages((m) => [...m, { sender: "user", text }]);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId.current, text, faqId }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { sender: "bot", text: data.reply }]);
      if (data.escalate) {
        setAwaitingTicket(true);
        setTicketDraft((d) => ({ ...d, message: text }));
      }
    } catch {
      setMessages((m) => [
        ...m,
        { sender: "bot", text: "Something went wrong reaching the server. Try again in a moment." },
      ]);
    } finally {
      setSending(false);
    }
  }

  async function submitTicket(e) {
    e.preventDefault();
    if (!ticketDraft.name || !ticketDraft.email || !ticketDraft.message) return;
    setSending(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId.current, ...ticketDraft }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { sender: "bot", text: data.reply }]);
      setTicketConfirmation(data.ticketId?.toString().slice(-6));
      setAwaitingTicket(false);
      setTicketDraft({ name: "", email: "", message: "" });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={styles.wrap}>
      {open && (
        <div className={styles.panel}>
          <header className={styles.header}>
            <div>
              <p className={styles.headerEyebrow}>Help &amp; support</p>
              <p className={styles.headerTitle}>We're here to help</p>
            </div>
            <button className={styles.iconBtn} onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </header>

          <div className={styles.thread} ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={m.sender === "user" ? styles.bubbleUser : styles.bubbleBot}>
                {m.text}
              </div>
            ))}

            {ticketConfirmation && (
              <div className={styles.ticketStub}>
                <span className={styles.ticketLabel}>Ticket opened</span>
                <span className={styles.ticketId}>#{ticketConfirmation}</span>
              </div>
            )}

            {awaitingTicket && (
              <form className={styles.ticketForm} onSubmit={submitTicket}>
                <input
                  placeholder="Your name"
                  value={ticketDraft.name}
                  onChange={(e) => setTicketDraft((d) => ({ ...d, name: e.target.value }))}
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={ticketDraft.email}
                  onChange={(e) => setTicketDraft((d) => ({ ...d, email: e.target.value }))}
                  required
                />
                <textarea
                  placeholder="Describe the issue"
                  value={ticketDraft.message}
                  onChange={(e) => setTicketDraft((d) => ({ ...d, message: e.target.value }))}
                  required
                  rows={2}
                />
                <button type="submit" disabled={sending}>
                  Open ticket
                </button>
              </form>
            )}
          </div>

          {!awaitingTicket && faqs.length > 0 && (
            <div className={styles.chips}>
              {faqs.map((f) => (
                <button key={f._id} className={styles.chip} onClick={() => sendMessage(f.label, f._id)}>
                  {f.label}
                </button>
              ))}
            </div>
          )}

          <form
            className={styles.inputRow}
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              disabled={awaitingTicket}
            />
            <button type="submit" disabled={sending || awaitingTicket} aria-label="Send message">
              →
            </button>
          </form>
        </div>
      )}

      <button className={styles.launcher} onClick={() => setOpen((o) => !o)} aria-label="Toggle support chat">
        {open ? "×" : "?"}
      </button>
    </div>
  );
}
