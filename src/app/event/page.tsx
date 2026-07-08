import type { Metadata } from "next";
import { EventPageContent } from "@/components/event/EventPageContent";

export const metadata: Metadata = {
  title: "EVENT | 스타벅스",
  description: "스타벅스 시즌별 이벤트 상품",
};

export default function EventPage() {
  return (
    <div className="min-h-full bg-white">
      <EventPageContent />
    </div>
  );
}
