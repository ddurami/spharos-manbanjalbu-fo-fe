"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  AddressField,
  underlineInputClassName,
  underlineSelectTriggerClassName,
} from "@/components/address/address-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getSelectedAddress,
  openDaumPostcode,
} from "@/lib/address/daum-postcode";
import { DELIVERY_MEMO_OPTIONS } from "@/lib/address/delivery-memo-options";
import { getAddress, saveAddress } from "@/lib/address/storage";
import { EMPTY_ADDRESS, type Address } from "@/lib/address/types";
import {
  hasValidationErrors,
  validateAddress,
  type AddressErrors,
} from "@/lib/address/validate-address";

const outlineButtonClassName =
  "h-14 rounded-full border-[1.5px] border-primary px-8 text-[17px] tracking-tight text-primary hover:bg-sb-green-soft hover:text-primary";

const addressSearchButtonClassName =
  "mb-2 h-10 shrink-0 rounded-full border-[1.5px] border-primary px-5 text-[17px] tracking-tight text-primary hover:bg-sb-green-soft hover:text-primary";

export function AddressForm() {
  const router = useRouter();
  const addressDetailRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Address>(EMPTY_ADDRESS);
  const [errors, setErrors] = useState<AddressErrors>({});
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [addressSearchError, setAddressSearchError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const saved = getAddress();
    if (saved) {
      setForm(saved);
    }
  }, []);

  const updateField = <K extends keyof Address>(key: K, value: Address[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleAddressSearch = async () => {
    setAddressSearchError(null);
    setIsSearchingAddress(true);

    try {
      await openDaumPostcode((result) => {
        const address = getSelectedAddress(result);

        setForm((current) => ({
          ...current,
          zipCode: result.zonecode,
          address,
          addressDetail: "",
        }));
        setErrors((current) => {
          const next = { ...current };
          delete next.zipCode;
          delete next.address;
          delete next.addressDetail;
          return next;
        });

        requestAnimationFrame(() => {
          addressDetailRef.current?.focus();
        });
      });
    } catch {
      setAddressSearchError(
        "주소검색 서비스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsSearchingAddress(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateAddress(form);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    saveAddress(form);
    router.push("/checkout");
  };

  return (
    <form
      className="flex w-full flex-col gap-10"
      noValidate
      onSubmit={handleSubmit}
    >
      <AddressField label="주소별칭" htmlFor="nickname">
        <Input
          id="nickname"
          value={form.nickname}
          onChange={(event) => updateField("nickname", event.target.value)}
          className={underlineInputClassName}
        />
      </AddressField>

      <AddressField
        label="받는 분"
        required
        htmlFor="recipient"
        error={errors.recipient}
      >
        <Input
          id="recipient"
          value={form.recipient}
          onChange={(event) => updateField("recipient", event.target.value)}
          className={underlineInputClassName}
          aria-invalid={Boolean(errors.recipient)}
        />
      </AddressField>

      <AddressField
        label="우편번호"
        required
        htmlFor="zipCode"
        error={errors.zipCode ?? addressSearchError ?? undefined}
      >
        <div className="flex items-end gap-4">
          <Input
            id="zipCode"
            readOnly
            value={form.zipCode}
            placeholder="주소검색을 이용해 주세요."
            className={underlineInputClassName}
            aria-invalid={Boolean(errors.zipCode || addressSearchError)}
          />
          <Button
            type="button"
            variant="outline"
            disabled={isSearchingAddress}
            onClick={handleAddressSearch}
            className={addressSearchButtonClassName}
          >
            {isSearchingAddress ? "불러오는 중..." : "주소검색"}
          </Button>
        </div>
      </AddressField>

      <AddressField
        label="기본주소"
        required
        htmlFor="address"
        error={errors.address}
      >
        <Input
          id="address"
          readOnly
          value={form.address}
          placeholder="주소검색을 이용해 주세요."
          className={underlineInputClassName}
          aria-invalid={Boolean(errors.address)}
        />
      </AddressField>

      <AddressField
        label="상세주소"
        required
        htmlFor="addressDetail"
        error={errors.addressDetail}
      >
        <Input
          id="addressDetail"
          ref={addressDetailRef}
          value={form.addressDetail}
          onChange={(event) =>
            updateField("addressDetail", event.target.value)
          }
          placeholder="동, 호수 등 상세주소를 입력해 주세요."
          className={underlineInputClassName}
          aria-invalid={Boolean(errors.addressDetail)}
        />
      </AddressField>

      <AddressField
        label="연락처1"
        required
        htmlFor="phone1"
        error={errors.phone1}
      >
        <Input
          id="phone1"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone1}
          onChange={(event) => updateField("phone1", event.target.value)}
          placeholder="010-1234-5678"
          className={underlineInputClassName}
          aria-invalid={Boolean(errors.phone1)}
        />
      </AddressField>

      <AddressField label="연락처2" htmlFor="phone2" error={errors.phone2}>
        <Input
          id="phone2"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone2}
          onChange={(event) => updateField("phone2", event.target.value)}
          placeholder="010-1234-5678"
          className={underlineInputClassName}
          aria-invalid={Boolean(errors.phone2)}
        />
      </AddressField>

      <AddressField label="배송 메모" htmlFor="deliveryMemo">
        <Select
          value={form.deliveryMemo || undefined}
          onValueChange={(value) => updateField("deliveryMemo", value ?? "")}
        >
          <SelectTrigger
            id="deliveryMemo"
            className={underlineSelectTriggerClassName}
          >
            <SelectValue placeholder="배송 메모를 선택해 주세요." />
          </SelectTrigger>
          <SelectContent>
            {DELIVERY_MEMO_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AddressField>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Link href="/checkout">
          <Button
            type="button"
            variant="outline"
            className={outlineButtonClassName}
          >
            취소
          </Button>
        </Link>
        <Button type="submit" className="h-14 rounded-full px-8 text-[17px]">
          저장
        </Button>
      </div>
    </form>
  );
}
