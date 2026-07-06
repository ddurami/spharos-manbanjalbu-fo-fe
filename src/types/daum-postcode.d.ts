declare namespace daum {
  interface PostcodeData {
    zonecode: string;
    roadAddress: string;
    jibunAddress: string;
    userSelectedType: "R" | "J";
  }

  interface PostcodeOptions {
    oncomplete: (data: PostcodeData) => void;
  }

  class Postcode {
    constructor(options: PostcodeOptions);
    open(): void;
  }
}

declare global {
  interface Window {
    daum?: typeof daum;
  }
}

export {};
