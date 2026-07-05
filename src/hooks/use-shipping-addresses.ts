"use client";

import { useCallback, useEffect, useState } from "react";

import {
  deleteShippingAddress,
  getShippingAddresses,
} from "@/lib/address/list-storage";
import type { ShippingAddress } from "@/lib/address/types";

export function useShippingAddresses() {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);

  const refresh = useCallback(() => {
    setAddresses(getShippingAddresses());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const removeAddress = useCallback(
    (id: string) => {
      deleteShippingAddress(id);
      refresh();
    },
    [refresh]
  );

  return {
    addresses,
    refresh,
    removeAddress,
  };
}
