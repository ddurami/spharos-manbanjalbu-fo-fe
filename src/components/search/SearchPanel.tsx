"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, XIcon, ClockIcon } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import {
  getSearchHistory,
  saveSearchHistory,
  deleteSearchHistoryItem,
  deleteAllSearchHistory,
  getRecommendedKeywords,
} from "@/lib/api/search";
import type { SearchHistory, RecommendedKeyword } from "@/types/search";

type SearchPanelProps = {
  onClose: () => void;
};

function HistoryItem({
  item,
  onSearch,
  onDelete,
}: {
  item: SearchHistory;
  onSearch: (keyword: string) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <li className="flex items-center gap-2 rounded px-1 py-1.5 hover:bg-sb-surface">
      <ClockIcon className="size-3.5 shrink-0 text-sb-text-muted" />
      <button
        type="button"
        onClick={() => onSearch(item.keyword)}
        className="flex-1 truncate text-left text-sm text-sb-text-secondary"
      >
        {item.keyword}
      </button>
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        className="shrink-0 text-sb-text-muted hover:text-sb-text-secondary"
        aria-label="삭제"
      >
        <XIcon className="size-3.5" />
      </button>
    </li>
  );
}

export function SearchPanel({ onClose }: SearchPanelProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const [keyword, setKeyword] = useState("");
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [recommended, setRecommended] = useState<RecommendedKeyword[]>([]);

  useEffect(() => {
    inputRef.current?.focus();

    getRecommendedKeywords()
      .then(setRecommended)
      .catch(() => {});

    if (isLoggedIn) {
      getSearchHistory()
        .then(setHistory)
        .catch(() => {});
    }
  }, [isLoggedIn]);

  const executeSearch = async (searchKeyword: string) => {
    if (!searchKeyword.trim()) return;

    if (isLoggedIn) {
      try {
        await saveSearchHistory(searchKeyword.trim());
      } catch {}
    }

    onClose();
    setKeyword("");
    router.push(
      `/products?keyword=${encodeURIComponent(searchKeyword.trim())}`,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") executeSearch(keyword);
    if (e.key === "Escape") onClose();
  };

  const handleDeleteHistory = async (id: number) => {
    try {
      await deleteSearchHistoryItem(id);
      setHistory((prev) => prev.filter((h) => h.id !== id));
    } catch {}
  };

  const handleDeleteAllHistory = async () => {
    try {
      await deleteAllSearchHistory();
      setHistory([]);
    } catch {}
  };

  const rows: [SearchHistory | undefined, SearchHistory | undefined][] = [];
  for (let i = 0; i < history.length; i += 2) {
    rows.push([history[i], history[i + 1]]);
  }

  return (
    <div className="border-b border-sb-border bg-white">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex items-center gap-3 border-b border-sb-border py-4">
          <SearchIcon className="size-5 shrink-0 text-sb-text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
            className="flex-1 text-base text-[#121212] outline-none placeholder:text-sb-text-muted"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-sb-text-muted hover:text-[#121212]"
            aria-label="검색 닫기"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="py-6">
          {isLoggedIn && history.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#121212]">
                  최근 검색어
                </h3>
                <button
                  type="button"
                  onClick={handleDeleteAllHistory}
                  className="text-xs text-sb-text-muted hover:text-sb-text-secondary"
                >
                  전체 삭제
                </button>
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-0">
                {rows.map(([left, right], rowIdx) => (
                  <li
                    key={rowIdx}
                    className="col-span-2 grid grid-cols-2 gap-x-6"
                  >
                    <ul>
                      {left && (
                        <HistoryItem
                          item={left}
                          onSearch={executeSearch}
                          onDelete={handleDeleteHistory}
                        />
                      )}
                    </ul>
                    <ul>
                      {right && (
                        <HistoryItem
                          item={right}
                          onSearch={executeSearch}
                          onDelete={handleDeleteHistory}
                        />
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {recommended.length > 0 && (
            <section>
              <h3 className="text-sm font-medium text-[#121212]">
                추천 검색어
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {recommended.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => executeSearch(item.keyword)}
                    className="rounded-full bg-sb-green px-4 py-1.5 text-sm font-medium text-white hover:bg-[#009658]"
                  >
                    #{item.label}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
