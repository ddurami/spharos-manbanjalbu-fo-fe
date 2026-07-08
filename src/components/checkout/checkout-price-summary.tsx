"use client";

import { useState } from "react";

import { CheckoutAlertModal } from "@/components/checkout/checkout-alert-modal";
import { DeliveryDatePickerModal } from "@/components/checkout/delivery-date-picker-modal";
import { ReservationDeliverySection } from "@/components/checkout/reservation-delivery-section";
import { PriceSummarySidebar } from "@/components/common/price-summary-sidebar";
import { canReserveDelivery } from "@/lib/checkout/reservation-delivery";
import type { CheckoutSummary } from "@/lib/checkout/types";
import { cn } from "@/lib/utils";

type CheckoutPriceSummaryProps = {
  summary: CheckoutSummary;
  hasAddress: boolean;
  reservationItems: Array<{ reservationAvailable?: boolean }>;
  isReservationEnabled: boolean;
  selectedReservationDate: string | null;
  onReservationEnabledChange: (enabled: boolean) => void;
  onReservationDateChange: (date: string | null) => void;
  className?: string;
};

export function CheckoutPriceSummary({
  summary,
  hasAddress,
  reservationItems,
  isReservationEnabled,
  selectedReservationDate,
  onReservationEnabledChange,
  onReservationDateChange,
  className,
}: CheckoutPriceSummaryProps) {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleReservationEnabledChange = (enabled: boolean) => {
    if (!enabled) {
      onReservationEnabledChange(false);
      onReservationDateChange(null);
      return;
    }

    if (!hasAddress) {
      setAlertMessage("배송 정보를 등록해주세요.");
      return;
    }

    if (!canReserveDelivery(reservationItems)) {
      setAlertMessage("예약 배송이 불가능한 상품입니다.");
      return;
    }

    onReservationEnabledChange(true);
  };

  return (
    <>
      <aside
        className={cn(
          "w-full max-w-[440px] shrink-0 lg:sticky lg:top-[96px] lg:self-start",
          className,
        )}
      >
        <div className="overflow-hidden border border-sb-border bg-white">
          <ReservationDeliverySection
            enabled={isReservationEnabled}
            selectedDate={selectedReservationDate}
            onEnabledChange={handleReservationEnabledChange}
            onOpenDatePicker={() => setIsDatePickerOpen(true)}
          />

          <div>
            <PriceSummarySidebar summary={summary} embedded />
          </div>
        </div>
      </aside>

      <DeliveryDatePickerModal
        open={isDatePickerOpen}
        selectedDate={selectedReservationDate}
        onClose={() => setIsDatePickerOpen(false)}
        onSelect={(date) => onReservationDateChange(date)}
      />

      <CheckoutAlertModal
        open={alertMessage !== null}
        message={alertMessage ?? ""}
        onClose={() => setAlertMessage(null)}
      />
    </>
  );
}
