"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/useTranslation";
import type { EmailThread, ThreadMessage } from "@/lib/affiliate-data";

type Props = {
  threads: EmailThread[];
  locale: string;
};

function formatDateTime(iso: string, locale: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusColor(status: EmailThread["status"]) {
  switch (status) {
    case "awaiting-reply":
      return "text-gray-900";
    case "open":
      return "text-gray-500";
    case "closed":
    default:
      return "text-gray-400";
  }
}

function roleLabel(
  role: ThreadMessage["from"],
  labelAffiliate: string,
  labelOrganiser: string,
) {
  return role === "affiliate" ? labelAffiliate : labelOrganiser;
}

export function EmailThreads({ threads, locale }: Props) {
  const { namespace } = useTranslation();
  const copy = namespace("affiliate").threads;
  const [activeThreadId, setActiveThreadId] = useState<string | null>(
    threads[0]?.id ?? null,
  );
  const [draft, setDraft] = useState("");

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) ?? null,
    [threads, activeThreadId],
  );

  if (threads.length === 0) {
    return <p className="text-sm text-gray-400">{copy.empty}</p>;
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
      <aside>
        <p className="mb-6 text-[11px] uppercase tracking-[0.16em] text-gray-400">
          {copy.listTitle}
        </p>
        <ul className="divide-y divide-gray-100 border-t border-gray-100">
          {threads.map((thread) => {
            const isActive = thread.id === activeThreadId;
            return (
              <li key={thread.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    setDraft("");
                  }}
                  className={cn(
                    "w-full py-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2",
                    isActive ? "text-gray-900" : "text-gray-500",
                  )}
                >
                  <p
                    className={cn(
                      "line-clamp-2 text-sm",
                      isActive ? "font-medium text-gray-900" : "text-gray-700",
                    )}
                  >
                    {thread.subject}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {thread.organiserName}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em]">
                    <span className={statusColor(thread.status)}>
                      {copy.statusLabels[thread.status]}
                    </span>
                    <time
                      dateTime={thread.lastActivityAt}
                      className="text-gray-400"
                    >
                      {formatDateTime(thread.lastActivityAt, locale)}
                    </time>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <section>
        {!activeThread ? (
          <p className="text-sm text-gray-400">{copy.selectPrompt}</p>
        ) : (
          <>
            <header className="border-b border-gray-100 pb-8">
              <p
                className={cn(
                  "text-[11px] uppercase tracking-[0.16em]",
                  statusColor(activeThread.status),
                )}
              >
                {copy.statusLabels[activeThread.status]}
              </p>
              <h3 className="mt-3 text-2xl font-light tracking-tight text-gray-900">
                {activeThread.subject}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {activeThread.eventName}
              </p>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
                    {copy.roles.affiliate}
                  </dt>
                  <dd className="mt-1.5 text-sm text-gray-900">
                    {activeThread.affiliateName}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
                    {copy.roles.organiser}
                  </dt>
                  <dd className="mt-1.5 text-sm text-gray-900">
                    {activeThread.organiserName}
                  </dd>
                  <dd className="text-xs text-gray-400">
                    {activeThread.organiserEmail}
                  </dd>
                </div>
              </dl>
            </header>

            <ol className="divide-y divide-gray-100">
              {activeThread.messages.map((message) => (
                <li key={message.id}>
                  <article className="py-8">
                    <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
                          {roleLabel(
                            message.from,
                            copy.roles.affiliate,
                            copy.roles.organiser,
                          )}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {message.authorName}
                        </span>
                      </div>
                      <time
                        dateTime={message.sentAt}
                        className="text-xs text-gray-400"
                      >
                        {formatDateTime(message.sentAt, locale)}
                      </time>
                    </header>
                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                      {message.body}
                    </p>
                  </article>
                </li>
              ))}
            </ol>

            <div className="border-t border-gray-100 pt-8">
              <Textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={copy.composer.placeholder}
                aria-label={copy.composer.placeholder}
                rows={4}
                className="resize-none border-0 border-b border-gray-200 rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-gray-900"
              />
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-gray-400">
                  {copy.composer.disclaimer}
                </p>
                <Button
                  type="button"
                  disabled={draft.trim().length === 0}
                  className="bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {copy.composer.send}
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
