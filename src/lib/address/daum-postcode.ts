export type DaumPostcodeResult = {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: "R" | "J";
};

const DAUM_POSTCODE_SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

let scriptPromise: Promise<void> | null = null;

function loadDaumPostcodeScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Daum Postcode is only available in the browser."));
  }

  if (window.daum?.Postcode) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = DAUM_POSTCODE_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load Daum Postcode script."));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export function getSelectedAddress(result: DaumPostcodeResult): string {
  return result.userSelectedType === "R"
    ? result.roadAddress
    : result.jibunAddress;
}

export async function openDaumPostcode(
  onComplete: (result: DaumPostcodeResult) => void
): Promise<void> {
  await loadDaumPostcodeScript();

  if (!window.daum?.Postcode) {
    throw new Error("Daum Postcode is unavailable.");
  }

  new window.daum.Postcode({
    oncomplete: (data) => {
      onComplete({
        zonecode: data.zonecode,
        roadAddress: data.roadAddress,
        jibunAddress: data.jibunAddress,
        userSelectedType: data.userSelectedType,
      });
    },
  }).open();
}
