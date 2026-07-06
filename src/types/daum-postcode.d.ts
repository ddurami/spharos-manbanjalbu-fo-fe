declare namespace daum {
  interface PostcodeData {
    zonecode: string;
    roadAddress: string;
    jibunAddress: string;
    userSelectedType: "R" | "J";
  }

  interface PostcodeOptions {
    oncomplete: (data: PostcodeData) => void;
    onclose?: (state: "FORCE_CLOSE" | "COMPLETE_CLOSE") => void;
    width?: string | number;
    height?: string | number;
  }

  class Postcode {
    constructor(options: PostcodeOptions);
    open(): void;
    embed(element: HTMLElement): void;
  }
}

declare global {
  interface Window {
    daum?: {
      Postcode: typeof daum.Postcode;
    };
  }
}

export {};
