import { useEffect, useState } from "react";

export const VERIFICATION_TIMER_SECONDS = 5 * 60;

export function formatVerificationTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function useVerificationCountdown(activeKey: number, durationSeconds: number) {
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    if (activeKey === 0) {
      setRemainingSeconds(0);
      return;
    }

    const expiresAt = Date.now() + durationSeconds * 1000;

    function syncRemaining() {
      setRemainingSeconds(Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000)));
    }

    syncRemaining();

    const timerId = window.setInterval(syncRemaining, 1000);

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        syncRemaining();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(timerId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeKey, durationSeconds]);

  return {
    remainingSeconds,
    isTimerActive: remainingSeconds > 0,
  };
}
