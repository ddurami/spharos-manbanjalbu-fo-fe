"use client";

import { RotateCcwIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category, Season } from "@/types/category";

type CategoryFilterProps = {
  categories: Category[];
  seasons: Season[];
  selectedCategoryId: number | null;
  selectedSubcategoryIds: number[];
  selectedSeasonId: number | null;
  selectedCapacities: string[];
  availableCapacities: string[];
  onCategoryChange: (id: number | null) => void;
  onSubcategoryToggle: (id: number) => void;
  onSubcategoryClear: () => void;
  onSeasonChange: (id: number | null) => void;
  onCapacityToggle: (capacity: string) => void;
  onCapacityClear: () => void;
};

function PrimaryTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 border-b-2 px-4 pb-2.5 text-lg font-medium transition-colors",
        active
          ? "border-sb-green text-sb-green"
          : "border-transparent text-sb-text-muted hover:text-sb-text-secondary",
      )}
    >
      {label}
    </button>
  );
}

function ChipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded border px-3 py-1 text-sm transition-colors",
        active
          ? "border-sb-green bg-sb-green-soft text-sb-green"
          : "border-sb-border text-sb-text-muted hover:bg-sb-surface",
      )}
    >
      {label}
    </button>
  );
}

function ResetButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "shrink-0 p-1",
        disabled
          ? "text-sb-border"
          : "text-sb-text-muted hover:text-sb-text-secondary",
      )}
      aria-label="선택 초기화"
    >
      <RotateCcwIcon className="size-3.5" />
    </button>
  );
}

function SeasonTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 px-3 pb-2 text-sm font-medium transition-colors",
        active
          ? "text-[#121212]"
          : "text-sb-text-muted hover:text-sb-text-secondary",
      )}
    >
      {label}
    </button>
  );
}

export function CategoryFilter({
  categories,
  seasons,
  selectedCategoryId,
  selectedSubcategoryIds,
  selectedSeasonId,
  selectedCapacities,
  availableCapacities,
  onCategoryChange,
  onSubcategoryToggle,
  onSubcategoryClear,
  onSeasonChange,
  onCapacityToggle,
  onCapacityClear,
}: CategoryFilterProps) {
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const subcategories = selectedCategory?.subcategories ?? [];
  const hasSubcategories = subcategories.length > 0;

  return (
    <div className="flex flex-col gap-4 border-b border-sb-border pb-4">
      <div className="flex items-center gap-1">
        <PrimaryTab
          label="전체"
          active={selectedCategoryId === null}
          onClick={() => onCategoryChange(null)}
        />
        {categories.map((cat) => (
          <PrimaryTab
            key={cat.id}
            label={cat.name}
            active={selectedCategoryId === cat.id}
            onClick={() => onCategoryChange(cat.id)}
          />
        ))}
      </div>

      {hasSubcategories && (
        <div className="flex flex-wrap items-center gap-2">
          {subcategories.map((sub) => (
            <ChipButton
              key={sub.id}
              label={sub.name}
              active={selectedSubcategoryIds.includes(sub.id)}
              onClick={() => onSubcategoryToggle(sub.id)}
            />
          ))}
          <ResetButton
            disabled={selectedSubcategoryIds.length === 0}
            onClick={onSubcategoryClear}
          />
        </div>
      )}

      {availableCapacities.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {availableCapacities.map((cap) => (
            <ChipButton
              key={cap}
              label={cap}
              active={selectedCapacities.includes(cap)}
              onClick={() => onCapacityToggle(cap)}
            />
          ))}
          <ResetButton
            disabled={selectedCapacities.length === 0}
            onClick={onCapacityClear}
          />
        </div>
      )}

      <div className="flex items-center gap-1">
        <SeasonTab
          label="전체"
          active={selectedSeasonId === null}
          onClick={() => onSeasonChange(null)}
        />
        {seasons.map((season) => (
          <SeasonTab
            key={season.id}
            label={season.name}
            active={selectedSeasonId === season.id}
            onClick={() => onSeasonChange(season.id)}
          />
        ))}
      </div>
    </div>
  );
}
