"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

function statusBadge(status: EmailThread["status"], label: string) {
  const tone =
    status === "awaiting-reply"
      ? "bg-amber-100 text-amber-900 border-amber-200"
      : status === "closed"
        ? "bg-gray-100 text-gray-700 border-gray-200"
        : "bg-emerald-100 text-emerald-900 border-emerald-200";

  return (
    <Badge
      variant="outline"
      className={cn("font-medium tracking-wide uppercase text-[10px]", tone)}
    >
      {label}
    </Badge>
  );
}

function roleBadge(
  role: ThreadMessage["from"],
  labelAffiliate: string,
  labelOrganiser: string,
) {
  const isAffiliate = role === "affiliate";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        isAffiliate
          ? "bg-blue-100 text-blue-800"
          : "bg-purple-100 text-purple-800",
      )}
    >
      {isAffiliate ? labelAffiliate : labelOrganiser}
    </span>
  );
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
    return (
      <Card className="bg-white border-gray-200">
        <CardContent className="p-8 text-center text-gray-500">
          {copy.empty}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <Card className="bg-white border-gray-200 h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            {copy.listTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-gray-100">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              const lastMessage = thread.messages[thread.messages.length - 1];
              return (
                <li key={thread.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveThreadId(thread.id);
                      setDraft("");
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors",
                      isActive && "bg-blue-50/60",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-sm text-gray-900 line-clamp-2">
                        {thread.subject}
                      </p>
                      {statusBadge(
                        thread.status,
                        copy.statusLabels[thread.status],
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {thread.organiserName}
                    </p>
                    {lastMessage && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                        {lastMessage.body}
                      </p>
                    )}
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 mt-2">
                      {formatDateTime(thread.lastActivityAt, locale)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-200">
        {!activeThread ? (
          <CardContent className="p-8 text-center text-gray-500">
            {copy.selectPrompt}
          </CardContent>
        ) : (
          <>
            <CardHeader className="border-b border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {activeThread.subject}
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">
                    {copy.event}: {activeThread.eventName}
                  </p>
                </div>
                {statusBadge(
                  activeThread.status,
                  copy.statusLabels[activeThread.status],
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-4 text-xs text-gray-600">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400">
                    {copy.roles.affiliate}
                  </p>
                  <p className="font-medium text-gray-800">
                    {activeThread.affiliateName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400">
                    {copy.roles.organiser}
                  </p>
                  <p className="font-medium text-gray-800">
                    {activeThread.organiserName}
                  </p>
                  <p className="text-gray-500">
                    {activeThread.organiserEmail}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-100">
                {activeThread.messages.map((message) => (
                  <li key={message.id} className="p-6 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {roleBadge(
                          message.from,
                          copy.roles.affiliate,
                          copy.roles.organiser,
                        )}
                        <span className="text-sm font-semibold text-gray-900">
                          {message.authorName}
                        </span>
                        <span className="text-xs text-gray-500">
                          &lt;{message.authorEmail}&gt;
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatDateTime(message.sentAt, locale)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                      {message.body}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 p-6 space-y-3">
                <Textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={copy.composer.placeholder}
                  rows={4}
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-gray-400">
                    {copy.composer.disclaimer}
                  </p>
                  <Button
                    type="button"
                    disabled={draft.trim().length === 0}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    {copy.composer.send}
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
