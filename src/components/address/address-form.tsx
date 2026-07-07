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
import { AddressPostcodeLayer } from "@/components/address/address-postcode-layer";
import {
  getSelectedAddress,
  type DaumPostcodeResult,
} from "@/lib/address/daum-postcode";
import { DELIVERY_MEMO_OPTIONS } from "@/lib/address/delivery-memo-options";
import {
  createAddress,
  fetchAddressById,
  fetchAddresses,
  fetchDefaultAddress,
  saveCheckoutAddress,
  updateAddress,
} from "@/lib/address/address-service";
import { ApiError } from "@/lib/api/client";
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

function normalizePhoneInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

type AddressFormProps = {
  addressId?: string;
  redirectHref?: string;
  cancelHref?: string;
};

export function AddressForm({
  addressId,
  redirectHref = "/checkout",
  cancelHref = "/checkout",
}: AddressFormProps) {
  const router = useRouter();
  const addressDetailRef = useRef<HTMLInputElement>(null);
  const isMypageForm = redirectHref.startsWith("/mypage");
  const isCheckoutForm = redirectHref.startsWith("/checkout");
  const [form, setForm] = useState<Address>(EMPTY_ADDRESS);
  const [isDefault, setIsDefault] = useState(false);
  const [isDefaultLocked, setIsDefaultLocked] = useState(false);
  const [errors, setErrors] = useState<AddressErrors>({});
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [addressSearchError, setAddressSearchError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(Boolean(addressId));
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadForm = async () => {
      if (addressId) {
        setIsLoading(true);
        try {
          const saved = await fetchAddressById(addressId);
          if (cancelled) {
            return;
          }

          if (saved) {
            setForm({
              nickname: saved.nickname,
              recipient: saved.recipient,
              zipCode: saved.zipCode,
              address: saved.address,
              addressDetail: saved.addressDetail,
              phone1: normalizePhoneInput(saved.phone1),
              phone2: normalizePhoneInput(saved.phone2),
              deliveryMemo: saved.deliveryMemo,
            });

            if (isMypageForm) {
              setIsDefault(saved.isDefault);
              setIsDefaultLocked(saved.isDefault);
            }
          }
        } catch {
          if (!cancelled) {
            setSubmitError("배송지 정보를 불러오지 못했습니다.");
          }
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
        return;
      }

      if (isMypageForm) {
        try {
          const addresses = await fetchAddresses();
          if (cancelled) {
            return;
          }

          const isFirstAddress = addresses.length === 0;
          setIsDefault(isFirstAddress);
          setIsDefaultLocked(isFirstAddress);
        } catch {
          if (!cancelled) {
            setSubmitError("배송지 목록을 불러오지 못했습니다.");
          }
        }
      }

      if (isCheckoutForm) {
        try {
          const saved = await fetchDefaultAddress();
          if (cancelled || !saved) {
            return;
          }

          setForm({
            ...saved,
            phone1: normalizePhoneInput(saved.phone1),
            phone2: normalizePhoneInput(saved.phone2),
          });
        } catch {
          if (!cancelled) {
            setSubmitError("기본 배송지를 불러오지 못했습니다.");
          }
        }
      }
    };

    void loadForm();

    return () => {
      cancelled = true;
    };
  }, [addressId, redirectHref, isMypageForm, isCheckoutForm]);

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

  const applyPostcodeResult = (result: DaumPostcodeResult) => {
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
    setAddressSearchError(null);

    requestAnimationFrame(() => {
      addressDetailRef.current?.focus();
    });
  };

  const handleAddressSearch = () => {
    setAddressSearchError(null);
    setIsSearchingAddress(true);
    setIsPostcodeOpen(true);
  };

  const handlePostcodeClose = () => {
    setIsPostcodeOpen(false);
    setIsSearchingAddress(false);
  };

  const handlePostcodeComplete = (result: DaumPostcodeResult) => {
    applyPostcodeResult(result);
    setIsPostcodeOpen(false);
    setIsSearchingAddress(false);
  };

  const handlePostcodeError = () => {
    setAddressSearchError(
      "주소검색 서비스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );
    setIsSearchingAddress(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const validationErrors = validateAddress(form);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (addressId) {
        await updateAddress(addressId, form, {
          setAsDefault: isMypageForm && isDefault,
        });
      } else if (isMypageForm) {
        await createAddress(form, { setAsDefault: isDefault });
      } else {
        await saveCheckoutAddress(form);
      }

      router.push(redirectHref);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "배송지 저장 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <p className="text-base text-sb-text-muted">배송지 정보를 불러오는 중...</p>
    );
  }

  return (
    <>
      <AddressPostcodeLayer
        open={isPostcodeOpen}
        onClose={handlePostcodeClose}
        onComplete={handlePostcodeComplete}
        onError={handlePostcodeError}
      />

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
            onChange={(event) =>
              updateField("phone1", normalizePhoneInput(event.target.value))
            }
            placeholder="01012345678"
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
            onChange={(event) =>
              updateField("phone2", normalizePhoneInput(event.target.value))
            }
            placeholder="01012345678"
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

        {isMypageForm ? (
          <label className="flex items-center gap-3 text-base text-foreground">
            <input
              type="checkbox"
              checked={isDefault}
              disabled={isDefaultLocked}
              onChange={(event) => setIsDefault(event.target.checked)}
              className="size-4 accent-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
            기본 배송지로 설정
          </label>
        ) : null}

        {submitError ? (
          <p className="text-sm text-destructive" role="alert">
            {submitError}
          </p>
        ) : null}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href={cancelHref}>
            <Button
              type="button"
              variant="outline"
              className={outlineButtonClassName}
              disabled={isSubmitting}
            >
              취소
            </Button>
          </Link>
          <Button
            type="submit"
            className="h-14 rounded-full px-8 text-[17px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>
    </>
  );
}
