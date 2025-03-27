const email = {
  required: '필수 입력 항목입니다',
  pattern: {
    value:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    message: '잘못된 이메일 형식입니다',
  },
};

const password = {
  required: '필수 입력 항목입니다',
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]).{8,}$/,
    message: '최소 8자 이상, 영문/숫자/특수문자를 모두 포함해야 합니다',
  },
};

const text = {
  required: '필수 입력 항목입니다',
};

const phoneNumber = {
  required: '필수 입력 항목입니다',
  pattern: {
    value: /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/,

    message: '잘못된 전화번호 형식입니다',
  },
};

const defaultRules = {
  email,
  password,
  text,
  phoneNumber,
};

export default defaultRules;
