// types/daum.d.ts

export {};

declare global {
  interface Window {
    daum: {
      Postcode: new (options: DaumPostcodeOptions) => {
        open: () => void;
      };
    };
  }
}

interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeData) => void;
  // 필요하면 여기 다른 콜백들 (onclose 등) 추가 가능
}

interface DaumPostcodeData {
  address: string;
  addressType: 'R' | 'J'; // 도로명 or 지번
  bname: string;
  buildingName: string;
  zonecode: string;
  jibunAddress: string;
  roadAddress: string;
  sido: string;
  sigungu: string;
  userSelectedType: 'R' | 'J';
  [key: string]: unknown; // 확장성을 위해
}
