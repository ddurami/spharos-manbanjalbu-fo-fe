export type DaumPostcodeResult = {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: "R" | "J";
};

const DAUM_POSTCODE_SCRIPT_URL =
  "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

let scriptPromise: Promise<void> | null = null;

function loadDaumPostcodeScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Daum Postcode is only available in the browser."),
    );
  }

  if (window.daum?.Postcode) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${DAUM_POSTCODE_SCRIPT_URL}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Daum Postcode script.")),
        { once: true },
      );
      return;
    }

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

function getPostcodeConstructor() {
  if (!window.daum?.Postcode) {
    throw new Error("Daum Postcode is unavailable.");
  }

  return window.daum.Postcode;
}

function mapPostcodeData(data: {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: "R" | "J";
}): DaumPostcodeResult {
  return {
    zonecode: data.zonecode,
    roadAddress: data.roadAddress,
    jibunAddress: data.jibunAddress,
    userSelectedType: data.userSelectedType,
  };
}

export function getSelectedAddress(result: DaumPostcodeResult): string {
  return result.userSelectedType === "R"
    ? result.roadAddress
    : result.jibunAddress;
}

export async function openDaumPostcode(
  onComplete: (result: DaumPostcodeResult) => void,
): Promise<void> {
  await loadDaumPostcodeScript();

  const Postcode = getPostcodeConstructor();

  new Postcode({
    oncomplete: (data) => {
      onComplete(mapPostcodeData(data));
    },
  }).open();
}

export async function embedDaumPostcode(
  container: HTMLElement,
  onComplete: (result: DaumPostcodeResult) => void,
): Promise<void> {
  await loadDaumPostcodeScript();

  const Postcode = getPostcodeConstructor();
  container.replaceChildren();

  new Postcode({
    oncomplete: (data) => {
      onComplete(mapPostcodeData(data));
    },
    width: "100%",
    height: "100%",
  }).embed(container);
}
